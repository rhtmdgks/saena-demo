import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import {POST,DELETE} from '../../app/api/rapid7/session/route';
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
function configure() {
 Object.assign(process.env,{RAPID7_ORIGIN:'https://backend.example',RAPID7_APP_ORIGIN:'https://demo.example',RAPID7_PUBLIC_KEY_PEM:publicKey.export({type:'spki',format:'pem'}).toString(),RAPID7_ISSUER:'synthetic-issuer',RAPID7_AUDIENCE:'synthetic-audience',RAPID7_TENANT_ID:'synthetic-tenant',RAPID7_MEMBERSHIPS_JSON:JSON.stringify({'synthetic-user':{actorId:'synthetic-actor',tenantId:'synthetic-tenant',reportIds:['synthetic-report']}})});
}
function token(padding='') {
 const now=Math.floor(Date.now()/1000);
 const h=Buffer.from(JSON.stringify({alg:'RS256',typ:'JWT'})).toString('base64url');
 const p=Buffer.from(JSON.stringify({iss:'synthetic-issuer',aud:'synthetic-audience',sub:'synthetic-user',jti:'synthetic-session',iat:now-1,nbf:now-1,exp:now+300,padding})).toString('base64url');
 return h+'.'+p+'.'+sign('RSA-SHA256',Buffer.from(h+'.'+p),privateKey).toString('base64url');
}
function request(method:string, bearer?:string, origin='https://demo.example') {
 return new Request('https://demo.example/api/rapid7/session',{method,headers:{origin,...(bearer?{authorization:'Bearer '+bearer}:{})}});
}
test('session route cookie boundaries and independent logout',async()=>{
 const saved={...process.env};
 try {
  configure();
  const normal=await POST(request('POST',token()));
  assert.equal(normal.status,200); assert.equal((await normal.json()).authenticated,true);
  assert.match(normal.headers.get('set-cookie')!,/HttpOnly; Secure; SameSite=Strict/);
  assert.ok(Buffer.byteLength(normal.headers.get('set-cookie')!)<4096);
  const oversized=await POST(request('POST',token('x'.repeat(3000))));
  assert.equal(oversized.status,400); assert.equal((await oversized.json()).error,'session_token_too_large');
  assert.equal(oversized.headers.get('set-cookie'),null);
  delete process.env.RAPID7_PUBLIC_KEY_PEM; delete process.env.RAPID7_MEMBERSHIPS_JSON; delete process.env.RAPID7_ORIGIN;
  const logout=await DELETE(request('DELETE'));
  assert.equal(logout.status,200); assert.match(logout.headers.get('set-cookie')!,/Max-Age=0/);
  const crossSite=await DELETE(request('DELETE',undefined,'https://evil.example'));
  assert.equal(crossSite.status,403); assert.equal(crossSite.headers.get('set-cookie'),null);
  delete process.env.RAPID7_APP_ORIGIN;
  assert.equal((await DELETE(request('DELETE'))).status,503);
 } finally {
  for(const key of Object.keys(process.env)) if(!(key in saved)) delete process.env[key];
  Object.assign(process.env,saved);
 }
});
