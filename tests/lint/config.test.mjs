import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ESLint } from 'eslint';
import config from '../../eslint.config.mjs';

test('flat migration preserves every explicit legacy rule', () => {
  const legacy = JSON.parse(readFileSync('.eslintrc.json', 'utf8').replace(/^\s*\/\/.*$/gm, ''));
  assert.deepEqual(config.at(-1).rules, legacy.rules);
});
test('ESLint resolves app and ESM test configuration without circular legacy loading', async () => {
  const eslint = new ESLint();
  for (const file of ['components/dashboard/content.tsx', 'tests/dashboard/data-contract.test.mjs']) {
    const effective = await eslint.calculateConfigForFile(file);
    assert.equal(effective.rules['react-hooks/rules-of-hooks'][0], 2);
    assert.ok(effective.plugins['react-hooks']);
    assert.ok(effective.plugins['@typescript-eslint']);
  }
});
