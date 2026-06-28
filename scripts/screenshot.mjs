// screenshot.mjs — batch full-page screenshots for site audits
// Usage:
//   node screenshot.mjs                 → reads URLs from urls.txt
//   node screenshot.mjs https://a.com   → one or more URLs as arguments
//
// Output: ./shots/<site>/desktop.png and ./shots/<site>/mobile.png

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const urls = (args.length
  ? args
  : fs.readFileSync('urls.txt', 'utf8').split('\n'))
  .map(s => s.trim())
  .filter(Boolean)
  .filter(s => !s.startsWith('#'))
  .map(u => (/^https?:\/\//.test(u) ? u : 'https://' + u));

if (!urls.length) {
  console.error('No URLs. Add some to urls.txt or pass them as arguments.');
  process.exit(1);
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'mobile',  width: 390,  height: 844, mobile: true  },
];

const slug = u => u.replace(/^https?:\/\//, '').replace(/[^a-z0-9.-]+/gi, '_').replace(/^_+|_+$/g, '').slice(0, 60);

const browser = await chromium.launch();

for (const url of urls) {
  const dir = path.join('shots', slug(url));
  fs.mkdirSync(dir, { recursive: true });

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.mobile,
      userAgent: vp.mobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch {
      try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); }
      catch { console.warn('  ! could not fully load', url); }
    }
    // give lazy-loaded images and fonts a moment to settle
    await page.waitForTimeout(1800);

    const out = path.join(dir, `${vp.name}.png`);
    try {
      await page.screenshot({ path: out, fullPage: true });
      console.log('  ✓', out);
    } catch (e) {
      console.warn('  ! screenshot failed for', url, vp.name, e.message);
    }
    await ctx.close();
  }
}

await browser.close();
console.log('\nDone. Screenshots are in ./shots');
