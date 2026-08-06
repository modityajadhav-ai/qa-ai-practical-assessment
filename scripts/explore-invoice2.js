const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.waitForLoadState('networkidle');
  await page.locator('#email').fill('customer@practicesoftwaretesting.com');
  await page.locator('#password').fill('welcome01');
  await page.locator('input[type="submit"]').click();
  await page.waitForURL('**/account**');

  await page.goto('https://practicesoftwaretesting.com/product/01KZB1CYD7Z89J5F49ARW3T0D5');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1500);

  await page.goto('https://practicesoftwaretesting.com/checkout');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="proceed-1"]').click();
  await page.locator('[data-test="proceed-2"]').click();
  await page.locator('#country').selectOption({ label: 'United States of America (the)' });
  await page.locator('#postal_code').fill('33101');
  await page.locator('#house_number').fill('123');
  await page.waitForTimeout(2000);
  await page.locator('[data-test="proceed-3"]').click();
  await page.locator('#payment-method').selectOption('cash-on-delivery');
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(2000);
  console.log('URL after double confirm:', page.url());
  const body = await page.locator('body').innerText();
  console.log('BODY:', body.slice(0, 1000));

  await page.goto('https://practicesoftwaretesting.com/account/invoices');
  await page.waitForLoadState('networkidle');
  const invoiceTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('INVOICES data-test:', invoiceTests.filter((t) => t.includes('invoice') || t.includes('order')));
  const invoiceText = await page.locator('body').innerText();
  console.log('INVOICES text:', invoiceText.slice(0, 600));

  await page.goto('https://practicesoftwaretesting.com/account/profile');
  await page.waitForLoadState('networkidle');
  const profileTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('PROFILE data-test:', profileTests);
  const profileInputs = await page.locator('input').evaluateAll((els) =>
    els.map((e) => ({ id: e.id, value: e.value?.slice(0, 30) })),
  );
  console.log('PROFILE inputs:', profileInputs);

  await browser.close();
})();
