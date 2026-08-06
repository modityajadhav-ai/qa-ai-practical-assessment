const { chromium } = require('playwright');
const { dataGenerator } = require('../utils/data-generator');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const email = dataGenerator.randomEmail();

  await page.goto('https://practicesoftwaretesting.com/auth/register');
  await page.waitForLoadState('networkidle');
  await page.locator('#first_name').fill('Test');
  await page.locator('#last_name').fill('User');
  await page.locator('#dob').fill('1990-05-15');
  await page.locator('#country').selectOption({ label: 'United States of America (the)' });
  await page.locator('#postal_code').fill('33101');
  await page.locator('#house_number').fill('123');
  await page.waitForTimeout(2000);
  await page.locator('#phone').fill('5551234567');
  await page.locator('#email').fill(email);
  await page.locator('#password').fill('Welcome01!');
  const regBtn = page.locator('input[type="submit"], button[type="submit"]');
  console.log('REGISTER submit count:', await regBtn.count());
  const regTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')).filter((t) => t.includes('register')),
  );
  console.log('REGISTER data-test:', regTests);
  await regBtn.first().click();
  await page.waitForTimeout(3000);
  console.log('URL after register:', page.url());
  console.log('EMAIL used:', email);
  const errText = await page.locator('.alert, [role="alert"]').allTextContents().catch(() => []);
  console.log('ALERTS:', errText);

  await browser.close();
})();
