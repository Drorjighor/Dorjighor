#!/usr/bin/env node

const baseUrl = process.argv[2];

if (!baseUrl) {
  console.error('Usage: npm run check:deploy -- <DEPLOYED_URL>');
  process.exit(1);
}

const normalizedBase = baseUrl.replace(/\/+$/, '');

const routes = ['/', '/products', '/product/1', '/about', '/contact'];

function withTimeout(ms = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { controller, clear: () => clearTimeout(id) };
}

async function checkRoute(path) {
  const url = `${normalizedBase}${path}`;
  const { controller, clear } = withTimeout();

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'dorjighor-post-deploy-check/1.0'
      }
    });

    const contentType = response.headers.get('content-type') || '';
    const ok = response.status >= 200 && response.status < 400;
    const isHtml = contentType.includes('text/html');

    return {
      path,
      ok: ok && isHtml,
      status: response.status,
      contentType,
      cacheControl: response.headers.get('cache-control') || ''
    };
  } catch (error) {
    return {
      path,
      ok: false,
      status: 0,
      contentType: '',
      cacheControl: '',
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clear();
  }
}

async function findAndCheckAsset() {
  const homepage = await fetch(`${normalizedBase}/`, { redirect: 'follow' });
  const html = await homepage.text();
  const match = html.match(/src=\"(\/assets\/[^\"]+\.js)\"/i);

  if (!match) {
    return {
      ok: false,
      message: 'No JS asset link found on homepage HTML.'
    };
  }

  const assetPath = match[1];
  const assetRes = await fetch(`${normalizedBase}${assetPath}`, { redirect: 'follow' });
  const cacheControl = assetRes.headers.get('cache-control') || '';

  return {
    ok: assetRes.status >= 200 && assetRes.status < 400,
    assetPath,
    status: assetRes.status,
    cacheControl
  };
}

async function run() {
  console.log(`Checking deployment: ${normalizedBase}`);

  const results = [];
  for (const route of routes) {
    const result = await checkRoute(route);
    results.push(result);
  }

  let failed = 0;
  for (const result of results) {
    if (result.ok) {
      console.log(`PASS ${result.path} -> ${result.status} (${result.contentType})`);
    } else {
      failed += 1;
      const reason = result.error || `${result.status} (${result.contentType || 'no content-type'})`;
      console.log(`FAIL ${result.path} -> ${reason}`);
    }
  }

  try {
    const assetResult = await findAndCheckAsset();
    if (assetResult.ok) {
      console.log(`PASS asset ${assetResult.assetPath} -> ${assetResult.status} (cache-control: ${assetResult.cacheControl || 'none'})`);
    } else {
      failed += 1;
      console.log(`FAIL asset check -> ${assetResult.message || 'Unknown error'}`);
    }
  } catch (error) {
    failed += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`FAIL asset check -> ${message}`);
  }

  if (failed > 0) {
    console.log(`\nDeployment check failed with ${failed} issue(s).`);
    process.exit(1);
  }

  console.log('\nDeployment check passed.');
}

run().catch((error) => {
  console.error('Unexpected error during deployment check:', error);
  process.exit(1);
});
