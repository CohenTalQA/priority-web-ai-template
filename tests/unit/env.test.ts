import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const moduleURL = new URL('../../src/utils/env.ts', import.meta.url).href;
const script = `
  const { env } = await import(${JSON.stringify(moduleURL)});
  process.stdout.write(JSON.stringify({
    baseURL: env.baseURL, name: env.name, artifacts: env.artifacts
  }));
`;

function loadEnvironment(
  overrides: NodeJS.ProcessEnv = {},
  files: Record<string, string> = {},
) {
  const directory = mkdtempSync(join(tmpdir(), 'priority-template-env-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      writeFileSync(join(directory, name), content);
    }
    const environment = { ...process.env };
    for (const key of ['TEST_ENV', 'E2E_BASE_URL', 'E2E_USERNAME', 'E2E_PASSWORD', 'E2E_ARTIFACTS', 'DOTENV_KEY']) {
      delete environment[key];
    }
    return spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
      cwd: directory,
      env: { ...environment, ...overrides },
      encoding: 'utf8',
      timeout: 10_000,
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('works without a local dotenv file and disables sensitive artifacts', () => {
  const result = loadEnvironment();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    baseURL: 'https://example.com', name: 'local', artifacts: false,
  });
});

test('loads a local dotenv file', () => {
  const result = loadEnvironment({}, { '.env': 'E2E_BASE_URL=http://localhost:3000\n' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).baseURL, 'http://localhost:3000');
});

test('loads only the named file and preserves process environment precedence', () => {
  const result = loadEnvironment(
    { TEST_ENV: 'staging', E2E_BASE_URL: 'https://approved.example' },
    {
      '.env': 'E2E_ARTIFACTS=false\n',
      '.env.staging': 'E2E_BASE_URL=https://file.example\nE2E_ARTIFACTS=true\n',
    },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    baseURL: 'https://approved.example', name: 'staging', artifacts: true,
  });
});

test('fails rather than silently using defaults when a named file is missing', () => {
  const result = loadEnvironment({ TEST_ENV: 'missing' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unable to load the environment file/);
});

test('rejects empty names and path traversal in TEST_ENV', () => {
  for (const name of ['', '../staging', '..\\staging', 'staging/prod']) {
    const result = loadEnvironment({ TEST_ENV: name });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /TEST_ENV must be/);
  }
});

test('rejects invalid URLs without echoing their contents', () => {
  for (const url of ['', 'not-a-url', 'file:///private', 'https://user:sentinel-secret@example.com']) {
    const result = loadEnvironment({ E2E_BASE_URL: url });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /E2E_BASE_URL must be/);
    assert.doesNotMatch(result.stderr, /sentinel-secret/);
  }
});

test('rejects ambiguous artifact flags', () => {
  const result = loadEnvironment({ E2E_ARTIFACTS: 'yes' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /E2E_ARTIFACTS must be/);
});
