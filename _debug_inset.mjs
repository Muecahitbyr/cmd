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
  const cs = getComputedStyle(el);
  return {
    top: cs.top, right: cs.right, bottom: cs.bottom, left: cs.left,
    height: cs.height, width: cs.width, display: cs.display,
    alignItems: cs.alignItems, justifyContent: cs.justifyContent,
    flexDirection: cs.flexDirection,
  };
});
console.log(JSON.stringify(info, null, 2));

// list all stylesheet rules matching .navbar-mobile
const rules = await page.evaluate(() => {
  const results = [];
  for (const sheet of document.styleSheets) {
    let cssRules;
    try { cssRules = sheet.cssRules; } catch (e) { continue; }
    for (const rule of cssRules) {
      if (rule.selectorText && rule.selectorText.includes('navbar-mobile') && !rule.selectorText.includes('nav') && !rule.selectorText.includes('phone')) {
        results.push({ selector: rule.selectorText, cssText: rule.cssText.slice(0, 300) });
      }
    }
  }
  return results;
});
console.log(JSON.stringify(rules, null, 2));

await browser.close();
