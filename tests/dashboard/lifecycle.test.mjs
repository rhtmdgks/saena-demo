import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToString} from 'react-dom/server';
const require=createRequire(import.meta.url);
function compile(file,mocks={}) {
  const text=fs.readFileSync(file,'utf8');
  const code=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const exports={};
  vm.runInNewContext(code,{exports,require:name=>name in mocks?mocks[name]:require(name)});
  return exports;
}
function deferred(){let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return {promise,resolve,reject}}
const settle=async()=>{for(let i=0;i<5;i++)await Promise.resolve()};
function panelHarness(file,method){
  const states=[],updates=[],requests=[];
  let cursor=0,effect;
  const hooks={useState(initial){const index=cursor++;if(!(index in states))states[index]=initial;return [states[index],value=>{states[index]=typeof value==='function'?value(states[index]):value;updates.push(index)}]},useEffect(callback){effect=callback}};
  const Component=compile(file,{react:hooks,'@/lib/api/dashboard-data':{[method]:()=>{const request=deferred();requests.push(request);return request.promise},dashboardFailure:()=> 'upstreamUnavailable'},'./measurement-state':{default:()=>null}}).default;
  const render=()=>{cursor=0;return Component()};
  return {states,updates,requests,render,start:()=>effect()};
}
function findButton(element){if(!element||typeof element!=='object')return undefined;if(element.type==='button')return element;for(const item of [element.props?.children].flat(Infinity)){const match=findButton(item);if(match)return match}return undefined}
const html={reportId:'fixture',report:{expected_page_count:1,measured_page_count:0,unmeasured_pages:['https://example.test'],measured_pages:[],limitations:[]}};
const observation={status:'unmeasured'};
for(const [name,method,value]of [['html-audit-panel','getHtmlAuditData',html],['observation-panel','getObservationData',observation]]){
 test(`${name}: effect starts request without synchronous state update`,async()=>{const h=panelHarness(`components/dashboard/${name}.tsx`,method);h.render();const cleanup=h.start();assert.equal(h.requests.length,1);assert.deepEqual(h.updates,[]);h.requests[0].resolve(value);await settle();assert.equal(h.states[0],value);assert.equal(h.states[2],false);cleanup()});
 test(`${name}: unmount ignores late success and finally`,async()=>{const h=panelHarness(`components/dashboard/${name}.tsx`,method);h.render();h.start()();h.requests[0].resolve(value);await settle();assert.deepEqual(h.updates,[])});
 test(`${name}: unmount ignores late rejection and finally`,async()=>{const h=panelHarness(`components/dashboard/${name}.tsx`,method);h.render();h.start()();h.requests[0].reject(Error('synthetic'));await settle();assert.deepEqual(h.updates,[])});
 test(`${name}: retry event clears stale data and retains loading/cleanup semantics`,async()=>{const h=panelHarness(`components/dashboard/${name}.tsx`,method);h.render();const stop=h.start();h.requests[0].resolve(value);await settle();const button=findButton(h.render());assert.equal(button.props.disabled,false);button.props.onClick();assert.equal(h.states[0],undefined);assert.equal(h.states[1],undefined);assert.equal(h.states[2],true);assert.equal(h.states[3],1);stop();h.render();const prior=h.updates.length;const cancel=h.start();assert.equal(h.updates.length,prior);assert.equal(h.requests.length,2);cancel();h.requests[1].resolve(value);await settle();assert.equal(h.updates.length,prior)});
}
test('hydration hook renders server fallback and exposes client snapshot without effect state',()=>{
 const {useHydrated}=compile('components/dashboard/use-hydrated.ts');
 const Probe=()=>React.createElement('span',null,useHydrated()?'ready':'pending');
 assert.equal(renderToString(React.createElement(Probe)),'<span>pending</span>');
 let client,server;
 const mock=compile('components/dashboard/use-hydrated.ts',{react:{useSyncExternalStore(subscribe,snapshot,serverSnapshot){assert.equal(typeof subscribe(()=>{}),'function');client=snapshot();server=serverSnapshot();return client}}});
 assert.equal(mock.useHydrated(),true);assert.equal(client,true);assert.equal(server,false);
});
test('NavItem has stable module scope and explicit navigation callback',()=>{
 const source=fs.readFileSync('components/dashboard/sidebar.tsx','utf8'),tree=ts.createSourceFile('sidebar.tsx',source,99,true,ts.ScriptKind.TSX);
 const moduleFunctions=tree.statements.filter(ts.isFunctionDeclaration);
 assert.ok(moduleFunctions.some(node=>node.name?.text==='NavItem'));
 const sidebar=moduleFunctions.find(node=>node.name?.text==='Sidebar');
 assert.ok(sidebar);assert.ok(!sidebar.body.statements.some(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='NavItem'));
 assert.match(source,/onClick=\{onNavigate\}/);
 let count=0;function visit(node){if((ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node))&&node.tagName.getText(tree)==='NavItem'){count++;assert.ok(node.attributes.properties.some(p=>ts.isJsxAttribute(p)&&p.name.getText(tree)==='onNavigate'))}ts.forEachChild(node,visit)}visit(tree);assert.ok(count>20);
});
