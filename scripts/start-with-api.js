const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const API_URL = process.env.REACT_APP_API_URL;
const HEALTH_PATH = '/health';
const API_DIR = path.resolve(__dirname, '..', '..', 'customer-service-api');
const FRONTEND_DIR = path.resolve(__dirname, '..');
const STARTUP_TIMEOUT_MS = parseInt(process.env.API_STARTUP_TIMEOUT_MS, 10) || 20000;
const STARTUP_CHECK_INTERVAL_MS = parseInt(process.env.API_STARTUP_CHECK_INTERVAL_MS, 10) || 500;

function isUrlHealthy(url) {
  return new Promise((resolve) => {
    try {
      const req = http.get(url, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 500);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(2000, () => {
        req.destroy();
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

async function waitForHealthy(url, timeoutMs = 20000, interval = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    // eslint-disable-next-line no-await-in-loop
    if (await isUrlHealthy(url)) return true;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, interval));
  }
  return false;
}

function spawnNpmStart(cwd, args = ['start']) {
  const cmd = 'npm';
  const options = { cwd, stdio: 'inherit', shell: true };
  const child = spawn(cmd, args, options);
  child.on('error', (err) => {
    console.error(`Failed to start process in ${cwd}:`, err);
  });
  return child;
}

async function main() {
  const healthUrl = `${API_URL.replace(/\/$/, '')}${HEALTH_PATH}`;
  console.log(`Checking API health at ${healthUrl}...`);

  if (await isUrlHealthy(healthUrl)) {
    console.log('API is already running. Starting frontend...');
    spawnNpmStart(FRONTEND_DIR, ['run', 'start:run']);
    return;
  }

  console.log('API not running — attempting to start API...');
  // Try to start the API by running its npm start
  spawnNpmStart(API_DIR, ['start']);

  console.log(`Waiting for API to become healthy (timeout: ${STARTUP_TIMEOUT_MS}ms)...`);
  const ok = await waitForHealthy(healthUrl, STARTUP_TIMEOUT_MS, STARTUP_CHECK_INTERVAL_MS);
  if (!ok) {
    console.error(`API did not become healthy within ${STARTUP_TIMEOUT_MS}ms. Exiting.`);

    process.exit(1);
  }

  console.log('API is healthy. Starting frontend...');
  spawnNpmStart(FRONTEND_DIR, ['run', 'start:run']);
}

main().catch((err) => {
  console.error('Error in start-with-api:', err);
  process.exit(1);
});
