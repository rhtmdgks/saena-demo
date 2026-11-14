import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
import ts from 'typescript';

function route(file, baseline = false) {
  const source = baseline ? execFileSync('git', ['show', `ef3b17c:${file}`], {encoding:'utf8'}) : readFileSync(file,'utf8');
  const output = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports = {};
  vm.runInNewContext(output, {exports, require:()=>({NextResponse:{json:(body,options)=>JSON.parse(JSON.stringify({body,status:options?.status??200}))}}), console:{log(){},warn(){},error(){}}, Date});
  return exports;
}
for (const file of ['app/api/seo/metrics/route.ts','app/api/seo/rum/route.ts']) {
  test(`${file}: POST response semantics remain unchanged`, async()=> {
    const before=route(file,true), after=route(file);
    for(const body of [{},{name:'LCP',value:10,url:'https://synthetic.example',timestamp:1000,rating:'good'}, {name:'LCP',value:10,url:'https://synthetic.example',timestamp:'invalid',rating:'poor'}, {name:'invalid',value:10,url:'https://synthetic.example',timestamp:1000}]) {
      const request={json:async()=>body};
      assert.deepEqual(await after.POST(request),await before.POST(request));
    }
  });
}
test('metrics GET filters retain existing response semantics',async()=> {
  const file='app/api/seo/metrics/route.ts',before=route(file,true),after=route(file);
  for(const metric of ['all','ctr','position','cwv','rum','unknown']) {
    const request={nextUrl:new URL(`https://synthetic.example?metric=${metric}&start_date=2026-01-01&url=x`)};
    assert.deepEqual(await after.GET(request),await before.GET(request));
  }
});
