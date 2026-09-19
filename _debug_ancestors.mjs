import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.click('.navbar-burger');
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const el = document.querySelector('.navbar-mobile');
  const chain = [];
  let node = el;
  while (node) {
    const cs = getComputedStyle(node);
    chain.push({
      tag: node.tagName,
      cls: node.className,
      transform: cs.transform,
      position: cs.position,
      willChange: cs.willChange,
      filter: cs.filter,
    });
    node = node.parentElement;
  }
  return chain;
});
console.log(JSON.stringify(info, null, 2));

const rect = await page.evaluate(() => document.querySelector('.navbar-mobile').getBoundingClientRect());
console.log('navbar-mobile rect:', JSON.stringify(rect));

await browser.close();
