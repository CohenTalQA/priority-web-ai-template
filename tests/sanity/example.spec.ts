import { test } from '../../src/fixtures/test-fixtures.js';

test('example page renders', async ({ examplePage }) => {
  await examplePage.goto();
  await examplePage.expectLoaded();
});
