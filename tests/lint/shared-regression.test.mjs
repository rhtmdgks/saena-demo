import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
import { format } from 'node:util';
import { Console } from 'node:console';
import { Writable } from 'node:stream';

function moduleFrom(source, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React } }).outputText,
    { exports, require: key => imports[key] ?? {}, setTimeout, clearTimeout, process: { env: { NODE_ENV: 'production' } } });
  return exports;
}
const read = file => fs.readFileSync(file, 'utf8');
const before = file => execFileSync('git', ['show', `ef3b17c:${file}`], { encoding: 'utf8' });

test('excluded animation files remain byte-identical to approved baseline', () => {
  for (const file of ['Counter','SimpleCounter','ProfileCard','ScrollStack','liquid-ether','plasma']) {
    const path = `components/${file}.tsx`;
    assert.equal(read(path), before(path));
  }
});

test('SEO metadata checks preserve results for valid inputs', () => {
  const old = moduleFrom(before('lib/seo/eeat.tsx'));
  const current = moduleFrom(read('lib/seo/eeat.tsx'));
  for (const data of [{}, {'@context':'https://schema.org','@type':'Article'}, {'@context':'https://schema.org','@type':'Person',name:'Synthetic'}, {'@context':'https://schema.org','@type':'Organization',name:'Synthetic',url:'https://example.test'}]) {
    assert.equal(JSON.stringify(current.validateJSONLD(data)), JSON.stringify(old.validateJSONLD(data)));
  }
});

test('typed async wrapper preserves resolved value and error translation', async () => {
  const old = moduleFrom(before('lib/api-error.ts'));
  const current = moduleFrom(read('lib/api-error.ts'));
  for (const mod of [old, current]) {
    assert.equal(await mod.asyncHandler(async (a, b) => a+b)(2,3),5);
    await assert.rejects(mod.asyncHandler(async () => { throw new mod.APIError('test',409,'TEST'); })(), error => error.message === 'test' && error.statusCode === 409 && error.code === 'TEST');
  }
});

test('CLI stdout formatter preserves Node console.log formatting', () => {
  const samples = [['hello'], ['%s %d','status',3], [{ synthetic:true }], ['a','b',42]];
  for (const args of samples) {
    let output = '';
    const stdout = new Writable({ write(chunk, _encoding, done) { output += chunk.toString(); done(); } });
    new Console({ stdout, stderr: stdout, colorMode: false }).log(...args);
    assert.equal(format(...args)+'\n', output);
  }
  for (const file of ['scripts/seo_audit.ts','scripts/optimize-images.ts']) {
    assert.match(read(file), /process\.stdout\.write\(format\(\.\.\.values\) \+ '\\n'\)/);
    assert.doesNotMatch(read(file), /console\.log\(/);
  }
});
