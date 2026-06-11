// Development helper. Renders the OG image and/or page screenshots with
// Playwright. Not part of the build; safe to delete.
//
//   node scripts/screenshots.mjs og
//       renders scripts/og.html to public/og.png (1200x630)
//
//   node scripts/screenshots.mjs pages [baseUrl] [outDir]
//       screenshots /, /axr/ and /receipt/ at desktop and mobile widths;
//       on /receipt/ it clicks "Verify signature" first so the captured
//       state shows a real verification. Default baseUrl
//       http://127.0.0.1:8080, default outDir ./shots
//
// Requires: npm i -D playwright && npx playwright install chromium
// (playwright is intentionally not in package.json; it is only needed here)

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const here = dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2] || 'og';

const browser = await chromium.launch();

if (mode === 'og') {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + join(here, 'og.html'));
  await page.waitForTimeout(400); // let the woff2 fonts settle
  const out = resolve(here, '../public/og.png');
  await page.screenshot({ path: out });
  console.log(`og: written ${out}`);
}

if (mode === 'pages') {
  const base = process.argv[3] || 'http://127.0.0.1:8080';
  const outDir = resolve(process.argv[4] || './shots');
  await mkdir(outDir, { recursive: true });

  const targets = [
    { path: '/', name: 'index' },
    { path: '/axr/', name: 'axr' },
    { path: '/receipt/', name: 'receipt', verify: true },
  ];
  const widths = [
    { w: 1440, h: 1000, tag: 'desktop' },
    { w: 390, h: 844, tag: 'mobile' },
  ];

  for (const t of targets) {
    for (const v of widths) {
      const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
      await page.goto(base + t.path, { waitUntil: 'networkidle' });
      if (t.verify) {
        const btn = page.locator('#r-verify-btn');
        await btn.waitFor({ state: 'visible' });
        await page.waitForFunction(
          () => !document.getElementById('r-verify-btn').disabled
        );
        await btn.click();
        await page.waitForFunction(() =>
          document.getElementById('r-stamp').textContent.includes('Verified')
        );
        await page.locator('#r-file-btn').click();
        await page.waitForFunction(() =>
          document.getElementById('r-file-result').textContent.includes('RESULT')
        );
      }
      const file = join(outDir, `${t.name}-${v.tag}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`pages: written ${file}`);
      await page.close();
    }
  }
}

await browser.close();
