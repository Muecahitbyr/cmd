import { chromium } from 'playwright';

const base = 'http://localhost:5190';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.click('.navbar-burger');
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('body *'));
  const matches = all.filter((el) => el.textContent.trim() === 'Galerie' || (el.children.length === 0 && el.textContent.includes('Galerie')));
  return matches.map((el) => ({
    tag: el.tagName,
    cls: el.className,
    text: el.textContent.slice(0, 40),
    rect: el.getBoundingClientRect(),
    zIndex: getComputedStyle(el).zIndex,
    position: getComputedStyle(el).position,
  }));
});
console.log(JSON.stringify(info, null, 2));

const navbarInnerRect = await page.evaluate(() => {
  const el = document.querySelector('.navbar-inner');
  const r = el.getBoundingClientRect();
  return { top: r.top, bottom: r.bottom, computedPosition: getComputedStyle(document.querySelector('.navbar')).position, navbarZ: getComputedStyle(document.querySelector('.navbar')).zIndex };
});
console.log('navbar-inner rect:', JSON.stringify(navbarInnerRect));

await browser.close();
