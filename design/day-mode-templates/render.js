const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT = process.argv[2] || __dirname;
const OPTS = (process.argv[3] || 'A,B,C').split(',');
const SLUG = { A: 'option_a_boarding_pass', B: 'option_b_field_card', C: 'option_c_glance_drawers' };
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1760, height: 1000 }, deviceScaleFactor: 2 });
  for (const opt of OPTS) {
    await page.goto('file://' + path.join(__dirname, 'mockups.html') + '?opt=' + opt, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    // report overflow inside each card so clipped content is caught
    const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('.col')).map(c => {
      const card = c.querySelector('.card');
      const all = Array.from(card.querySelectorAll('*'));
      const cardB = card.getBoundingClientRect().bottom - 12;
      const contentB = Math.max(...all.map(k => k.getBoundingClientRect().bottom));
      const clipped = all.filter(k => !k.classList.contains('clamp') && !k.closest('.clamp') && k.scrollHeight > k.clientHeight + 1 && getComputedStyle(k).overflow !== 'visible').map(k => k.className);
      return { shot: c.dataset.shot, slackPx: Math.round(cardB - contentB), clipped };
    }));
    console.log(opt, JSON.stringify(overflow));
    await page.locator('.sheet').screenshot({ path: path.join(OUT, `${SLUG[opt]}_all_four_screens.png`) });
    for (const col of await page.locator('.col').all()) {
      const shot = await col.getAttribute('data-shot');
      await col.locator('.phone').screenshot({ path: path.join(OUT, `${SLUG[opt]}_${shot}.png`) });
    }
  }
  await browser.close();
})();
