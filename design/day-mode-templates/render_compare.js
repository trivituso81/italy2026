const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1760, height: 1100 }, deviceScaleFactor: 2 });
  await page.goto('file://' + require('path').join(__dirname, 'compare.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator('.sheet').screenshot({ path: require('path').join(__dirname, 'comparison_dinner_current_vs_a_b_c.png') });
  await browser.close();
})();
