import { createPublicKey, verify } from 'node:crypto';

export class BridgeError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}
const fail = (status, code) => { throw new BridgeError(status, code); };
export const COOKIE = '__Host-rapid7-session';
export const SECTION_KEYS = ['brandVisibility','citationAnalysis','topicVisibility','homeContent','marketingStrategy','stp','shoppingContent','modelContent','industryContent'];
const text = (x, max = 512) => typeof x === 'string' && x.length > 0 && x.length <= max;
const id = x => text(x,128) && /^[A-Za-z0-9_-]+$/.test(x);
export function loadAppOrigin(env = process.env) {
  try {
    const origin = new URL(env.RAPID7_APP_ORIGIN);
    if(origin.protocol !== 'https:' || origin.username || origin.password || origin.search || origin.hash || origin.pathname !== '/') throw Error();
    return {appOrigin: origin.origin};
  } catch { fail(503,'bridge_not_configured'); }
}
export function sessionCookie(token, actor, now = Math.floor(Date.now()/1000)) {
  // Cookie metadata must fit within normal browser/proxy 4096-byte limits.
  if(Buffer.byteLength(token,'utf8') > 3500) fail(400,'session_token_too_large');
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.max(0,actor.expires-now)}`;
}
export function clearSessionCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}
export function loadConfig(env = process.env) {
  try {
    const origin = new URL(env.RAPID7_ORIGIN);
    const appOrigin = new URL(env.RAPID7_APP_ORIGIN);
    const loopback = ['localhost','127.0.0.1','[::1]'].includes(origin.hostname);
    if (origin.username || origin.password || origin.search || origin.hash || origin.pathname !== '/' ||
      !(origin.protocol === 'https:' || (env.NODE_ENV !== 'production' && origin.protocol === 'http:' && loopback))) throw Error();
    if (appOrigin.protocol !== 'https:' || appOrigin.username || appOrigin.password || appOrigin.search || appOrigin.hash || appOrigin.pathname !== '/') throw Error();
    const pem=env.RAPID7_PUBLIC_KEY_PEM?.replace(/\\n/g,'\n');
    if(typeof pem !== 'string' || pem.includes('PRIVATE KEY') || !/^-----BEGIN (?:RSA )?PUBLIC KEY-----/.test(pem.trim())) throw Error();
    const key = createPublicKey(pem);
    if (key.asymmetricKeyType !== 'rsa' || key.asymmetricKeyDetails.modulusLength < 2048) throw Error();
    if (!text(env.RAPID7_ISSUER) || !text(env.RAPID7_AUDIENCE) || !id(env.RAPID7_TENANT_ID)) throw Error();
    if (!text(env.RAPID7_MEMBERSHIPS_JSON, 65536)) throw Error();
    const members = JSON.parse(env.RAPID7_MEMBERSHIPS_JSON);
    if (!members || Array.isArray(members) || typeof members !== 'object' || Object.keys(members).length > 1000) throw Error();
    for (const [subject, member] of Object.entries(members)) {
      if (member?.observationIds !== undefined && (!Array.isArray(member.observationIds) || member.observationIds.length > 100 || !member.observationIds.every(id))) throw Error();
      if (!text(subject) || !member || !id(member.actorId) || member.tenantId !== env.RAPID7_TENANT_ID || !Array.isArray(member.reportIds) || member.reportIds.length > 100 || !member.reportIds.every(id)) throw Error();
    }
    return { origin: origin.origin, appOrigin: appOrigin.origin, key, issuer: env.RAPID7_ISSUER, audience: env.RAPID7_AUDIENCE, tenantId: env.RAPID7_TENANT_ID, members };
  } catch { fail(503,'bridge_not_configured'); }
}
function uniqueJson(raw) {
  const parsed = JSON.parse(raw);
  const stack=[];
  const tokens=raw.match(/"(?:\\.|[^"\\])*"|[{}\[\]:,]|[^\s{}\[\]:,]+/g) || [];
  for(let i=0;i<tokens.length;i++) {
    const t=tokens[i];
    if(t==='{') stack.push(new Set());
    else if(t==='[') stack.push(null);
    else if(t==='}' || t===']') stack.pop();
    else if(t.startsWith('"') && tokens[i+1]===':') {
      const key=JSON.parse(t); const keys=stack.at(-1);
      if(!keys || keys.has(key)) throw Error(); keys.add(key);
    }
  }
  return parsed;
}
const decode = part => {
  if (!/^[A-Za-z0-9_-]+$/.test(part)) throw Error();
  const bytes=Buffer.from(part,'base64url');
  if(bytes.toString('base64url')!==part) throw Error();
  return uniqueJson(bytes.toString('utf8'));
};
export function authenticate(token, config, now = Math.floor(Date.now()/1000)) {
  try {
    if (!text(token,16384)) throw Error();
    const parts = token.split('.'); if (parts.length !== 3) throw Error();
    const header = decode(parts[0]); const claims = decode(parts[1]);
    if (header.alg !== 'RS256' || Object.keys(header).some(k => !['alg','typ','kid'].includes(k))) throw Error();
    if (!/^[A-Za-z0-9_-]+$/.test(parts[2]) || Buffer.from(parts[2],'base64url').toString('base64url') !== parts[2]) throw Error();
    if (!verify('RSA-SHA256', Buffer.from(parts[0]+'.'+parts[1]), config.key, Buffer.from(parts[2],'base64url'))) throw Error();
    if (claims.iss !== config.issuer || claims.aud !== config.audience || !text(claims.sub) || !text(claims.jti)) throw Error();
    if (![claims.iat,claims.nbf,claims.exp].every(Number.isInteger) || !(claims.iat <= claims.nbf && claims.nbf <= now && now < claims.exp && claims.exp-claims.iat <= 3600 && claims.exp > claims.iat)) throw Error();
    if (!Object.hasOwn(config.members,claims.sub)) throw Error();
    const member = config.members[claims.sub];
    if (member.tenantId !== config.tenantId) throw Error();
    return { ...member, expires: claims.exp };
  } catch { fail(401,'authentication_required'); }
}
export function requestToken(request) {
  const authorization = request.headers.get('authorization');
  if (authorization !== null) {
    if (!/^Bearer [A-Za-z0-9_.-]+$/.test(authorization)) fail(401,'authentication_required');
    return authorization.slice(7);
  }
  const matches = (request.headers.get('cookie') || '').split(';').map(v => v.trim()).filter(v => v.startsWith(COOKIE+'='));
  if (matches.length !== 1) fail(401,'authentication_required');
  return matches[0].slice(COOKIE.length+1);
}
export function requireSameOrigin(request, config) {
  if (request.headers.get('origin') !== config.appOrigin || request.headers.get('sec-fetch-site') === 'cross-site') fail(403,'origin_denied');
}
async function fetchJson(path,token,member,config,fetcher) {
  try {
    const response = await fetcher(`${config.origin}${path}`, {
      headers: { Authorization:`Bearer ${token}`, 'x-saena-tenant-id':member.tenantId, Accept:'application/json' },
      cache:'no-store', redirect:'error', signal:AbortSignal.timeout(10000)
    });
    if (!response.ok) fail(response.status===401?401:response.status===403?403:503,'upstream_unavailable');
    if (!response.headers.get('content-type')?.includes('application/json') || !response.body) throw Error();
    const reader=response.body.getReader(); const chunks=[]; let size=0;
    try { while (true) { const {done,value}=await reader.read(); if(done) break; size+=value.byteLength; if(size>8*1024*1024) { await reader.cancel(); throw Error(); } chunks.push(value); } } finally {reader.releaseLock();}
    return uniqueJson(Buffer.concat(chunks).toString('utf8'));
  } catch(error) {if(error instanceof BridgeError) throw error; fail(503,'upstream_unavailable');}
}
function validateReport(report,member) {
  try {
    const fields=['tenant_id','scope','expected_page_count','measured_page_count','unmeasured_pages','measured_pages','warnings','limitations'];
    if (!report || typeof report !== 'object' || Array.isArray(report) || Object.keys(report).length!==fields.length || !fields.every(k=>Object.hasOwn(report,k)) || report.tenant_id!==member.tenantId || report.scope!=='offline_supplied_html') throw Error();
    if(!Number.isInteger(report.expected_page_count) || !Number.isInteger(report.measured_page_count) || report.expected_page_count<1 || report.expected_page_count>1000 || report.measured_page_count<0 || report.measured_page_count>report.expected_page_count) throw Error();
    if(!Array.isArray(report.measured_pages) || report.measured_pages.length!==report.measured_page_count || !Array.isArray(report.unmeasured_pages) || report.unmeasured_pages.length+report.measured_page_count!==report.expected_page_count || !Array.isArray(report.warnings) || !Array.isArray(report.limitations)) throw Error();
    if(!report.limitations.includes('Not a live fetch, index, citation, traffic or revenue measurement.')) throw Error();
  } catch { fail(503,'upstream_unavailable'); }
}
function validateObservations(data,member,collectionId) {
  try {
    const fields=['schema_version','collection_id','tenant_id','engine_id','status','sample_count','total_citations','unique_domains','by_day','domain_counts','evidence_ids','coverage','provenance','limitations'];
    const count=x=>Number.isSafeInteger(x) && x>=0 && x<=10000000;
    const exact=(x,keys)=>x && typeof x==='object' && !Array.isArray(x) && Object.keys(x).length===keys.length && keys.every(k=>Object.hasOwn(x,k));
    if(!exact(data,fields) || data.schema_version!==1 || data.collection_id!==collectionId || data.tenant_id!==member.tenantId || data.engine_id!=='chatgpt-search') throw Error();
    if(![data.sample_count,data.total_citations,data.unique_domains].every(count) || data.sample_count>10000 || data.status!==(data.sample_count>0?'measured':'unmeasured')) throw Error();
    if(!exact(data.coverage,['expected_samples','measured_samples','missing_samples']) || !Object.values(data.coverage).every(count) || data.coverage.measured_samples!==data.sample_count || data.coverage.expected_samples!==data.coverage.measured_samples+data.coverage.missing_samples) throw Error();
    if(!Array.isArray(data.by_day) || data.by_day.length>10000 || !Array.isArray(data.domain_counts) || data.domain_counts.length>10000 || !Array.isArray(data.evidence_ids) || data.evidence_ids.length!==data.sample_count || !Array.isArray(data.provenance) || data.provenance.length!==data.sample_count || !Array.isArray(data.limitations) || data.limitations.length<1 || data.limitations.length>32 || !data.limitations.every(v=>text(v,4096))) throw Error();
    const days=new Set(); let samples=0,citations=0;
    for(const day of data.by_day) {
      if(!exact(day,['date','sample_count','citation_count']) || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || Number.isNaN(Date.parse(day.date)) || new Date(day.date).toISOString().slice(0,10)!==day.date || days.has(day.date) || !count(day.sample_count) || day.sample_count===0 || !count(day.citation_count)) throw Error();
      days.add(day.date); samples+=day.sample_count; citations+=day.citation_count;
    }
    if(samples!==data.sample_count || citations!==data.total_citations) throw Error();
    const domains=new Set(); let domainCitations=0;
    for(const row of data.domain_counts) {
      if(!exact(row,['domain','count']) || !text(row.domain,253) || row.domain!==row.domain.toLowerCase() || !/^[a-z0-9.-]+$/.test(row.domain) || row.domain.startsWith('.') || row.domain.endsWith('.') || row.domain.includes('..') || domains.has(row.domain) || !count(row.count) || row.count===0) throw Error();
      domains.add(row.domain); domainCitations+=row.count;
    }
    if(domains.size!==data.unique_domains || domainCitations!==data.total_citations) throw Error();
    if(!data.evidence_ids.every(v=>text(v,512)) || new Set(data.evidence_ids).size!==data.evidence_ids.length) throw Error();
    const provenanceIds=new Set();
    for(const row of data.provenance) {
      if(!exact(row,['observation_id','artifact_hash','captured_at']) || !data.evidence_ids.includes(row.observation_id) || provenanceIds.has(row.observation_id) || !/^sha256:[a-f0-9]{64}$/.test(row.artifact_hash) || !text(row.captured_at,128) || Number.isNaN(Date.parse(row.captured_at))) throw Error();
      provenanceIds.add(row.observation_id);
    }
  } catch {fail(503,'observation_contract_invalid');}
}
export async function dashboard(request, config, fetcher = fetch) {
  const token = requestToken(request); const member = authenticate(token,config);
  const url = new URL(request.url);
  if (url.searchParams.getAll('reportId').length > 1 || url.searchParams.getAll('observationId').length > 1 || [...url.searchParams.keys()].some(k => !['reportId','observationId'].includes(k))) fail(400,'invalid_query');
  const reportId = url.searchParams.get('reportId') || member.reportIds[0];
  const observationId = url.searchParams.get('observationId') || member.observationIds?.[0];
  if(reportId && (!id(reportId) || !member.reportIds.includes(reportId))) fail(403,'report_access_denied');
  if(observationId && (!id(observationId) || !member.observationIds?.includes(observationId))) fail(403,'observation_access_denied');
  if(!reportId && !observationId) fail(403,'report_access_denied');
  let htmlAudit;
  if(reportId) {
    const report=await fetchJson(`/v1/html-audit-reports/${encodeURIComponent(reportId)}`,token,member,config,fetcher);
    validateReport(report,member); htmlAudit={reportId,report};
  }
  let observations={status:'unmeasured',reason:'No registered ChatGPT Search collection configured.'};
  if(observationId) {
    const data=await fetchJson(`/v1/ui-observations/${encodeURIComponent(observationId)}`,token,member,config,fetcher);
    validateObservations(data,member,observationId);
    observations={status:data.sample_count > 0 ? 'measured':'unmeasured',collectionId:observationId,data};
  }
  return {schemaVersion:1,provider:'chatgpt-search',sections:Object.fromEntries(SECTION_KEYS.map(k=>[k,{status:'unmeasured',reason:'No registered full dashboard metric contract supplied.'}])),...(htmlAudit?{htmlAudit}:{}),observations,limitations:['HTML diagnostics do not measure AI citations, traffic, revenue or causal lift.','Observed citations do not establish brand visibility, attribution, revenue or causal lift.']};
}
export const SAFE_HEADERS = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Cookie, Authorization'};
export function errorResponse(error) {
  const safe=error instanceof BridgeError ? error : new BridgeError(503,'bridge_unavailable');
  return Response.json({error:safe.code},{status:safe.status,headers:SAFE_HEADERS});
}
