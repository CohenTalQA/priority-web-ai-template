import { config } from 'dotenv';

const name = process.env.TEST_ENV;
if (name !== undefined && !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(name)) {
  throw new Error('TEST_ENV must be a non-empty environment name using letters, numbers, underscores or hyphens.');
}

const envFile = name === undefined ? '.env' : `.env.${name}`;
const loaded = config({ path: envFile, quiet: true });
const loadError: Error | undefined = loaded.error;
if (loadError && (name !== undefined || !('code' in loadError) || loadError.code !== 'ENOENT')) {
  throw new Error('Unable to load the environment file. Check TEST_ENV and file access.');
}

const baseURL = process.env.E2E_BASE_URL ?? 'https://example.com';
let parsedURL: URL;
try {
  parsedURL = new URL(baseURL);
} catch {
  throw new Error('E2E_BASE_URL must be an absolute HTTP(S) URL without embedded credentials.');
}
if (
  !['http:', 'https:'].includes(parsedURL.protocol) ||
  parsedURL.username ||
  parsedURL.password ||
  baseURL.trim() !== baseURL
) {
  throw new Error('E2E_BASE_URL must be an absolute HTTP(S) URL without embedded credentials.');
}

const artifacts = process.env.E2E_ARTIFACTS ?? 'false';
if (artifacts !== 'true' && artifacts !== 'false') {
  throw new Error('E2E_ARTIFACTS must be either true or false.');
}

export const env = {
  baseURL,
  username: process.env.E2E_USERNAME,
  password: process.env.E2E_PASSWORD,
  name: name ?? 'local',
  artifacts: artifacts === 'true',
};
