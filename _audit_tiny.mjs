import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const outDir = '/private/tmp/claude-501/-Users-mucahitbayar-VSProjects-cmd-industriell/d8f19061-d413-48ed-b014-ef65228e9d45/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 690 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const overflow = await page.evaluate(() => ({
  doc: document.documentElement.scrollWidth,
  win: window.innerWidth,
}));
console.log('320px overflow check:', JSON.stringify(overflow));

await page.screenshot({ path: `${outDir}/tiny-hero.png` });

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.15));
await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/tiny-hero2.png` });

await page.locator('.stats').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/tiny-stats.png` });

await page.click('.navbar-burger');
await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/tiny-navmenu.png` });
await page.keyboard.press('Escape').catch(() => {});
await page.click('.navbar-burger');
await page.waitForTimeout(400);

await page.click('.navbar-cta').catch(async () => {
  await page.click('.navbar-burger');
  await page.click('.navbar-mobile .btn-primary');
});
await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/tiny-booking.png` });

console.log('ERRORS:', errors.length);
errors.forEach((e) => console.log(e));
await browser.close();
