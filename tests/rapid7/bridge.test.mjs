import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import {authenticate,loadConfig,dashboard,requestToken,requireSameOrigin,COOKIE} from '../../lib/rapid7/bridge.mjs';
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
const env={NODE_ENV:'test',RAPID7_ORIGIN:'http://127.0.0.1:8000',RAPID7_APP_ORIGIN:'https://demo.example',RAPID7_PUBLIC_KEY_PEM:publicKey.export({type:'spki',format:'pem'}),RAPID7_ISSUER:'test-issuer',RAPID7_AUDIENCE:'test-audience',RAPID7_TENANT_ID:'synthetic-tenant',RAPID7_MEMBERSHIPS_JSON:JSON.stringify({'synthetic-user':{actorId:'synthetic-actor',tenantId:'synthetic-tenant',reportIds:['synthetic-report']}})};
const config=loadConfig(env);
function token(patch={}) {const now=Math.floor(Date.now()/1000); const h=Buffer.from(JSON.stringify({alg:'RS256',typ:'JWT'})).toString('base64url');const p=Buffer.from(JSON.stringify({iss:'test-issuer',aud:'test-audience',sub:'synthetic-user',jti:'synthetic-session',iat:now-1,nbf:now-1,exp:now+300,...patch})).toString('base64url');return `${h}.${p}.${sign('RSA-SHA256',Buffer.from(h+'.'+p),privateKey).toString('base64url')}`;}
const request=(suffix='',value=token())=>new Request('https://demo.example/api/rapid7/dashboard'+suffix,{headers:{authorization:'Bearer '+value}});
test('accepts valid subject and issuer/audience bound token',()=>assert.equal(authenticate(token(),config).actorId,'synthetic-actor'));
for(const [name,patch] of Object.entries({issuer:{iss:'bad'},audience:{aud:'bad'},unknown:{sub:'other'},expired:{exp:0},future:{nbf:9999999999},lifetime:{exp:9999999999},arrayAudience:{aud:['test-audience']}})) test('rejects '+name,()=>assert.throws(()=>authenticate(token(patch),config),e=>e.status===401));
test('rejects altered signature',()=>assert.throws(()=>authenticate(token().slice(0,-8)+'aaaaaaaa',config)));
test('demo cookie is not authentication',()=>assert.throws(()=>requestToken(new Request('https://demo.example',{headers:{cookie:'admin-session=authenticated'}}))));
test('duplicate session cookies rejected',()=>assert.throws(()=>requestToken(new Request('https://demo.example',{headers:{cookie:`${COOKIE}=a; ${COOKIE}=b`}}))));
test('cross origin mutation rejected',()=>assert.throws(()=>requireSameOrigin(new Request('https://demo.example',{headers:{origin:'https://evil.example'}}),config)));
test('same origin accepted',()=>requireSameOrigin(new Request('https://demo.example',{headers:{origin:'https://demo.example'}}),config));
test('insecure public upstream rejected',()=>assert.throws(()=>loadConfig({...env,RAPID7_ORIGIN:'http://example.org'})));
test('production loopback HTTP rejected',()=>assert.throws(()=>loadConfig({...env,NODE_ENV:'production'})));
test('tenant mismatch in configured membership rejected',()=>assert.throws(()=>loadConfig({...env,RAPID7_MEMBERSHIPS_JSON:JSON.stringify({user:{actorId:'a',tenantId:'other',reportIds:[]}})})));
test('authorized report is fetched, but diagnostics never become visibility',async()=>{let call;const result=await dashboard(request(),config,async(...args)=>{call=args;return Response.json({tenant_id:'synthetic-tenant',scope:'offline_supplied_html',expected_page_count:1,measured_page_count:0,unmeasured_pages:['https://example.test'],measured_pages:[],warnings:[],limitations:['Not a live fetch, index, citation, traffic or revenue measurement.']});}); assert.equal(call[0],'http://127.0.0.1:8000/v1/html-audit-reports/synthetic-report'); assert.equal(call[1].redirect,'error');assert.equal(call[1].headers['x-saena-tenant-id'],'synthetic-tenant'); assert.equal(result.provider,'chatgpt-search');assert.equal(result.htmlAudit.report.expected_page_count,1);assert.equal(result.sections.brandVisibility.status,'unmeasured');assert.equal(result.sections.brandVisibility.data,undefined);assert.equal(result.sections.modelContent.status,'unmeasured');});
test('client cannot choose another tenant or URL',async()=>{await assert.rejects(()=>dashboard(request('?tenant=other'),config),e=>e.status===400);});
test('ungranted report rejected before fetch',async()=>{await assert.rejects(()=>dashboard(request('?reportId=other'),config,()=>assert.fail('must not fetch')),e=>e.status===403);});
test('upstream error is sanitized',async()=>{await assert.rejects(()=>dashboard(request(),config,()=>{throw Error('secret details');}),e=>e.message==='upstream_unavailable');});
test('bad content type rejected',async()=>{await assert.rejects(()=>dashboard(request(),config,async()=>new Response('<html/>')),e=>e.status===503);});
test('upstream size bound enforced',async()=>{await assert.rejects(()=>dashboard(request(),config,async()=>new Response('x'.repeat(8*1024*1024+1),{headers:{'content-type':'application/json'}})),e=>e.status===503);});

test('duplicate reportId rejected',async()=>{await assert.rejects(()=>dashboard(request('?reportId=synthetic-report&reportId=other'),config),e=>e.status===400);});
test('wrong report tenant rejected',async()=>{await assert.rejects(()=>dashboard(request(),config,async()=>Response.json({tenant_id:'other'})),e=>e.status===503);});
test('noncanonical signature rejected',()=>assert.throws(()=>authenticate(token()+'=',config)));
test('signed duplicate claims rejected',()=>{
  const original=token().split('.');
  const raw=Buffer.from(original[1],'base64url').toString('utf8').replace('{','{"sub":"attacker",');
  const payload=Buffer.from(raw).toString('base64url');
  const signed=original[0]+'.'+payload;
  const jwt=signed+'.'+sign('RSA-SHA256',Buffer.from(signed),privateKey).toString('base64url');
  assert.throws(()=>authenticate(jwt,config),e=>e.status===401);
});
test('signed escaped duplicate claims rejected',()=>{
  const original=token().split('.');
  const raw=Buffer.from(original[1],'base64url').toString('utf8').replace('{','{"s\\u0075b":"attacker",');
  const payload=Buffer.from(raw).toString('base64url');
  const signed=original[0]+'.'+payload;
  const jwt=signed+'.'+sign('RSA-SHA256',Buffer.from(signed),privateKey).toString('base64url');
  assert.throws(()=>authenticate(jwt,config),e=>e.status===401);
});
const observationConfig=loadConfig({...env,RAPID7_MEMBERSHIPS_JSON:JSON.stringify({'synthetic-user':{actorId:'synthetic-actor',tenantId:'synthetic-tenant',reportIds:[],observationIds:['synthetic-collection']}})});
function evidence(patch={}) {return {schema_version:1,collection_id:'synthetic-collection',tenant_id:'synthetic-tenant',engine_id:'chatgpt-search',status:'measured',sample_count:1,total_citations:1,unique_domains:1,by_day:[{date:'2026-11-14',sample_count:1,citation_count:1}],domain_counts:[{domain:'example.test',count:1}],evidence_ids:['synthetic-observation'],coverage:{expected_samples:2,measured_samples:1,missing_samples:1},provenance:[{observation_id:'synthetic-observation',artifact_hash:'sha256:'+'a'.repeat(64),captured_at:'2026-11-14T12:00:00Z'}],limitations:['Synthetic test fixture; no causal lift claim.'],...patch};}
test('observation-only member receives measured citations without inferred marketing metrics',async()=>{
 let path;
 const result=await dashboard(request(),observationConfig,async(url)=>{path=url;return Response.json(evidence());});
 assert.equal(path,'http://127.0.0.1:8000/v1/ui-observations/synthetic-collection');
 assert.equal(result.observations.status,'measured'); assert.equal(result.observations.data.total_citations,1);
 assert.equal(result.observations.data.coverage.missing_samples,1); assert.equal(result.htmlAudit,undefined); assert.equal(result.sections.brandVisibility.status,'unmeasured');
});
test('zero observed citations is measured, not missing',async()=>{
 const result=await dashboard(request(),observationConfig,async()=>Response.json(evidence({total_citations:0,unique_domains:0,by_day:[{date:'2026-11-14',sample_count:1,citation_count:0}],domain_counts:[]})));
 assert.equal(result.observations.status,'measured'); assert.equal(result.observations.data.total_citations,0);
});
test('empty collection stays unmeasured',async()=>{
 const result=await dashboard(request(),observationConfig,async()=>Response.json(evidence({status:'unmeasured',sample_count:0,total_citations:0,unique_domains:0,by_day:[],domain_counts:[],evidence_ids:[],provenance:[],coverage:{expected_samples:2,measured_samples:0,missing_samples:2}})));
 assert.equal(result.observations.status,'unmeasured');
});
for(const [name,patch] of Object.entries({tenant:{tenant_id:'other'},engine:{engine_id:'other'},collection:{collection_id:'other'},sum:{total_citations:2},daySum:{by_day:[{date:'2026-11-14',sample_count:2,citation_count:1}]},duplicateDomains:{domain_counts:[{domain:'example.test',count:1},{domain:'example.test',count:1}]},coverage:{coverage:{expected_samples:2,measured_samples:1,missing_samples:0}},falseMeasured:{status:'unmeasured'},provenance:{provenance:[]},hash:{provenance:[{observation_id:'synthetic-observation',artifact_hash:'invalid',captured_at:'2026-11-14T12:00:00Z'}]}})) test('observation rejects '+name,async()=>{await assert.rejects(()=>dashboard(request(),observationConfig,async()=>Response.json(evidence(patch))),e=>e.status===503);});
test('ungranted collection denied before fetch',async()=>{await assert.rejects(()=>dashboard(request('?observationId=other'),observationConfig,()=>assert.fail()),e=>e.status===403);});
test('duplicate observationId denied',async()=>{await assert.rejects(()=>dashboard(request('?observationId=a&observationId=b'),observationConfig),e=>e.status===400);});

test('private PEM forbidden in public-key configuration',()=>assert.throws(()=>loadConfig({...env,RAPID7_PUBLIC_KEY_PEM:privateKey.export({type:'pkcs8',format:'pem'}).toString()}),e=>e.status===503));
