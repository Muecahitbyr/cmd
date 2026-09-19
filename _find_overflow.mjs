import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 690 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const offenders = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('body *'));
  const results = [];
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 || r.left < -1) {
      results.push({
        tag: el.tagName,
        cls: typeof el.className === 'string' ? el.className.slice(0, 60) : '',
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  return results.slice(0, 30);
});
console.log(JSON.stringify(offenders, null, 2));
await browser.close();
