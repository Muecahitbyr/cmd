import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const outDir = '/private/tmp/claude-501/-Users-mucahitbayar-VSProjects-cmd-industriell/d8f19061-d413-48ed-b014-ef65228e9d45/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.click('.navbar-burger');
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/navmenu-clean.png` });

const html = await page.locator('.navbar-mobile').innerHTML();
console.log('navbar-mobile HTML:', html.slice(0, 500));

const bodyChildrenCount = await page.evaluate(() => document.body.children.length);
console.log('body children:', bodyChildrenCount);

const openOverlays = await page.evaluate(() => {
  return {
    lightbox: !!document.querySelector('.lightbox'),
    bookingBackdrop: !!document.querySelector('.booking-backdrop'),
    productModal: !!document.querySelector('.product-modal'),
  };
});
console.log('open overlays:', JSON.stringify(openOverlays));

await browser.close();
