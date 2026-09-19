import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 690 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const report = await page.evaluate(() => {
  const doc = document.documentElement.scrollWidth;
  const sections = Array.from(document.querySelectorAll('main > *, header, footer'));
  const rows = sections.map((el) => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: (el.className || '').toString().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right), scrollWidth: el.scrollWidth };
  });
  return { doc, win: window.innerWidth, rows };
});
console.log(JSON.stringify(report, null, 2));
await browser.close();
