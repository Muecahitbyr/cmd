import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const base = 'http://localhost:5190';
const outDir = '/private/tmp/claude-501/-Users-mucahitbayar-VSProjects-cmd-industriell/d8f19061-d413-48ed-b014-ef65228e9d45/scratchpad/audit2';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function sectionShots(page, prefix) {
  const selectors = [
    '.video-hero',
    '#start',
    '.partners',
    '#bereiche',
    '.cleaning-types',
    '.stats',
    '#leistungen',
    '#galerie',
    '.testimonial',
    '.cta-section',
    '.footer',
  ];
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const safe = sel.replace(/[^a-z0-9]/gi, '');
    await page.screenshot({ path: `${outDir}/${prefix}-${safe}.png` });
  }
}

for (const [name, vp] of [
  ['mobile', { width: 390, height: 844 }],
  ['tablet', { width: 768, height: 1024 }],
]) {
  const page = await browser.newPage({ viewport: vp });
  page.on('pageerror', (e) => errors.push(`[${name}] ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${name}] ${m.text()}`));

  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await sectionShots(page, `home-${name}`);

  // mobile/tablet nav menu (only relevant if burger visible)
  const burgerVisible = await page.locator('.navbar-burger').isVisible();
  if (burgerVisible) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('.navbar-burger');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outDir}/${name}-navmenu.png` });
    await page.click('.navbar-burger');
    await page.waitForTimeout(400);
  }

  // booking modal
  await page.evaluate(() => window.scrollTo(0, 0));
  const ctaBtn = burgerVisible
    ? null
    : page.locator('.navbar-cta');
  if (!burgerVisible) {
    await page.click('.navbar-cta');
  } else {
    await page.click('.navbar-burger');
    await page.waitForTimeout(400);
    await page.click('.navbar-mobile .btn-primary');
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${name}-booking-modal.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // gallery lightbox
  await page.locator('#galerie').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('.gallery-item').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/${name}-lightbox.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // shop page
  await page.goto(base + '/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const shopSelectors = ['.shop-header', '.product-grid', '.shop-benefits', '.inquiry-form'];
  for (const sel of shopSelectors) {
    const el = page.locator(sel).first();
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const safe = sel.replace(/[^a-z0-9]/gi, '');
    await page.screenshot({ path: `${outDir}/shop-${name}-${safe}.png` });
  }

  // product modal
  await page.locator('.product-grid').scrollIntoViewIfNeeded();
  await page.locator('.product-card button:has-text("Details")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/shop-${name}-modal.png` });

  await page.close();
}

console.log('ERRORS:', errors.length);
errors.forEach((e) => console.log(e));
await browser.close();
