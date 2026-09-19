import { chromium } from 'playwright';

const base = 'http://localhost:5190';
const outDir = '/private/tmp/claude-501/-Users-mucahitbayar-VSProjects-cmd-industriell/d8f19061-d413-48ed-b014-ef65228e9d45/scratchpad/audit';
import { mkdirSync } from 'fs';
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  mobileLg: { width: 430, height: 932 },
  tablet: { width: 768, height: 1024 },
  tabletLg: { width: 834, height: 1194 },
};

const browser = await chromium.launch();
const errors = [];

async function shootFullPage(page, url, prefix) {
  await page.goto(base + url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/${prefix}.png`, fullPage: true });
}

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const page = await browser.newPage({ viewport: vp });
  page.on('pageerror', (e) => errors.push(`[${name}] ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${name}] ${m.text()}`));

  await shootFullPage(page, '/', `home-${name}`);
  await shootFullPage(page, '/shop', `shop-${name}`);
  await shootFullPage(page, '/impressum', `impressum-${name}`);
  await shootFullPage(page, '/datenschutz', `datenschutz-${name}`);

  // check for horizontal overflow
  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    return { docWidth, winWidth, hasOverflow: docWidth > winWidth };
  });
  if (overflow.hasOverflow) {
    console.log(`OVERFLOW on ${name} at /: doc=${overflow.docWidth} win=${overflow.winWidth}`);
  }

  await page.close();
}

console.log('ERRORS:', errors.length);
errors.forEach((e) => console.log(e));

await browser.close();
