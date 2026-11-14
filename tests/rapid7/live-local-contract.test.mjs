/** Real loopback test. Requires RAPID7_TEST_CHECKOUT and RAPID7_TEST_PYTHON.
 * Creates no customer data, uses random ephemeral RSA keys, and never replaces a service.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {dashboard,loadConfig} from '../../lib/rapid7/bridge.mjs';
const checkout=process.env.RAPID7_TEST_CHECKOUT;
const python=process.env.RAPID7_TEST_PYTHON;
const server=String.raw`
import os, sys, json, pathlib, tempfile, hashlib, socket, signal
root=pathlib.Path(os.environ['RAPID7_TEST_CHECKOUT']).resolve()
for folder in sorted(root.glob('**/src')):
    if '.venv' not in folder.parts: sys.path.insert(0,str(folder))
sys.path.insert(0,str(root/'packages/schemas'))
import uvicorn
import saena_forge_console.app as app_module
import saena_forge_console.ui_observation_store as store_module
assert pathlib.Path(app_module.__file__).resolve().is_relative_to(root)
assert pathlib.Path(store_module.__file__).resolve().is_relative_to(root)
from saena_forge_console.verified_auth import TokenVerifier,Membership
payload=json.loads(sys.stdin.readline())
os.environ['SAENA_TENANT_ID']='synthetic-tenant'
verifier=TokenVerifier(public_key_pem=payload['publicKey'].encode(),issuer='synthetic-issuer',audience='synthetic-audience',memberships={
 'synthetic-user':Membership(actor_id='synthetic-actor',tenant_id='synthetic-tenant',roles=frozenset()),
 'synthetic-denied':Membership(actor_id='synthetic-denied',tenant_id='synthetic-tenant',roles=frozenset()),
})
with tempfile.TemporaryDirectory(prefix='rapid7-local-contract-',dir='/private/tmp') as temp:
    base=pathlib.Path(temp).resolve()
    entries={}
    for name,refs,empty in [('positive',['https://example.test/a','https://example.test/b'],False),('zero',[],False),('missing',[],True)]:
        row={'tenant_id':'synthetic-tenant','run_id':'synthetic-run','engine_id':'chatgpt-search','observation_id':'synthetic-observation','raw_object_ref':'memory://synthetic-fixture','artifact_hash':'sha256:'+'a'*64,'citation_refs':refs,'captured_at':'2026-11-14T12:00:00Z'}
        document={'schema_version':1,'tenant_id':'synthetic-tenant','expected_observation_ids':['synthetic-observation','synthetic-missing'],'observations':[] if empty else [row]}
        folder=base/name; folder.mkdir(mode=0o700)
        data=json.dumps(document).encode(); path=folder/'observations.json'; path.write_bytes(data); path.chmod(0o600)
        entries[name]=store_module.ObservationEntry(tenant_id='synthetic-tenant',relative_directory=name,sha256='sha256:'+hashlib.sha256(data).hexdigest())
    catalog=store_module.ObservationCatalog(root=str(base),entries=entries,readers={('synthetic-tenant','synthetic-actor')})
    app=app_module.create_app(token_verifier=verifier,observation_catalog=catalog)
    sock=socket.socket(); sock.bind(('127.0.0.1',0)); sock.listen(128)
    config=uvicorn.Config(app,log_level='critical',access_log=False)
    instance=uvicorn.Server(config)
    print(json.dumps({'port':sock.getsockname()[1],'source':str(pathlib.Path(app_module.__file__).resolve())}),flush=True)
    instance.run(sockets=[sock])
`;
function jwt(privateKey,sub='synthetic-user') {
 const now=Math.floor(Date.now()/1000);
 const h=Buffer.from(JSON.stringify({alg:'RS256',typ:'JWT'})).toString('base64url');
 const p=Buffer.from(JSON.stringify({iss:'synthetic-issuer',aud:'synthetic-audience',sub,jti:'synthetic-session',iat:now-1,nbf:now-1,exp:now+300})).toString('base64url');
 const input=h+'.'+p;return input+'.'+sign('RSA-SHA256',Buffer.from(input),privateKey).toString('base64url');
}
test('real Python API to Node BFF synthetic observation contract',{skip:!checkout||!python,timeout:30000},async()=>{
 const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
 const pem=publicKey.export({type:'spki',format:'pem'}).toString();
 const child=spawn(python,['-u','-c',server],{env:{...process.env,PYTHONDONTWRITEBYTECODE:'1',RAPID7_TEST_CHECKOUT:checkout},stdio:['pipe','pipe','pipe']});
 let stderr='';child.stderr.on('data',b=>{stderr+=b.toString();});
 child.stdin.end(JSON.stringify({publicKey:pem})+'\n');
 try {
  const info=await new Promise((resolve,reject)=>{
   let stdout='';const timer=setTimeout(()=>reject(Error('server startup timeout')),10000);
   child.stdout.on('data',b=>{stdout+=b.toString();if(stdout.includes('\n')) {clearTimeout(timer);try {resolve(JSON.parse(stdout.split('\n')[0]));}catch(e){reject(e);}}});
   child.once('exit',()=>{clearTimeout(timer);reject(Error('server exited before ready: '+stderr));});
  });
  assert.ok(info.source.startsWith(checkout+'/'));
  const origin=`http://127.0.0.1:${info.port}`;
  for(let attempt=0;attempt<30;attempt++){try {await fetch(origin+'/healthz');break;}catch{await new Promise(r=>setTimeout(r,50));}}
  const config=loadConfig({NODE_ENV:'test',RAPID7_ORIGIN:origin,RAPID7_APP_ORIGIN:'https://demo.example',RAPID7_PUBLIC_KEY_PEM:pem,RAPID7_ISSUER:'synthetic-issuer',RAPID7_AUDIENCE:'synthetic-audience',RAPID7_TENANT_ID:'synthetic-tenant',RAPID7_MEMBERSHIPS_JSON:JSON.stringify({
   'synthetic-user':{actorId:'synthetic-actor',tenantId:'synthetic-tenant',reportIds:[],observationIds:['positive','zero','missing']},
   'synthetic-denied':{actorId:'synthetic-denied',tenantId:'synthetic-tenant',reportIds:[],observationIds:['positive']},
  })});
  const request=(collection,sub)=>new Request(`https://demo.example/api/rapid7/dashboard?observationId=${collection}`,{headers:{authorization:'Bearer '+jwt(privateKey,sub)}});
  const positive=await dashboard(request('positive'),config);
  assert.equal(positive.observations.status,'measured');assert.equal(positive.observations.data.total_citations,2);assert.equal(positive.observations.data.unique_domains,1);assert.equal(positive.observations.data.coverage.missing_samples,1);
  const zero=await dashboard(request('zero'),config);assert.equal(zero.observations.status,'measured');assert.equal(zero.observations.data.total_citations,0);
  const missing=await dashboard(request('missing'),config);assert.equal(missing.observations.status,'unmeasured');assert.equal(missing.observations.data.coverage.missing_samples,2);
  await assert.rejects(()=>dashboard(request('positive','synthetic-denied'),config),e=>e.status===403);
  const crossTenant=await fetch(origin+'/v1/ui-observations/positive',{headers:{authorization:'Bearer '+jwt(privateKey),'x-saena-tenant-id':'other-tenant'}});assert.equal(crossTenant.status,403);
 } finally {
  if(child.exitCode===null) {child.kill('SIGTERM');await Promise.race([once(child,'exit'),new Promise(r=>setTimeout(r,3000))]);if(child.exitCode===null)child.kill('SIGKILL');}
 }
});
