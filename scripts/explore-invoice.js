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
  await page.goto('https://practicesoftwaretesting.com/product/01KZB1CYDBTY5MRAJJXM8K2E4K');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1500);

  await page.goto('https://practicesoftwaretesting.com/checkout');
  await page.waitForLoadState('networkidle');

  const paymentOptions = await page.locator('#payment-method option').evaluateAll((els) =>
    els.map((e) => ({ value: e.value, text: e.textContent?.trim() })),
  );
  console.log('PAYMENT OPTIONS:', paymentOptions);

  await page.locator('[data-test="proceed-1"]').click();
  await page.waitForTimeout(500);
  await page.locator('[data-test="proceed-2"]').click();
  await page.waitForTimeout(500);

  await page.locator('#country').selectOption({ label: 'United States of America (the)' });
  await page.locator('#postal_code').fill('33101');
  await page.locator('#house_number').fill('123');
  await page.waitForTimeout(2000);
  await page.locator('[data-test="proceed-3"]').click();
  await page.waitForTimeout(500);

  await page.locator('#payment-method').selectOption('cash-on-delivery');
  const finishTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')).filter((t) => t.includes('finish') || t.includes('confirm')),
  );
  console.log('FINISH/CONFIRM tests:', finishTests);

  const buttons = await page.locator('button').evaluateAll((els) =>
    els.map((e) => ({
      test: e.getAttribute('data-test'),
      text: e.textContent?.trim().slice(0, 40),
    })).filter((b) => b.text && !b.text.includes('Categories')),
  );
  console.log('BUTTONS:', buttons);

  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(1000);
  const afterFirst = await page.locator('button').evaluateAll((els) =>
    els.map((e) => ({
      test: e.getAttribute('data-test'),
      text: e.textContent?.trim().slice(0, 40),
    })).filter((b) => b.text?.toLowerCase().includes('confirm') || b.test?.includes('confirm')),
  );
  console.log('AFTER FIRST FINISH confirm buttons:', afterFirst);
  const bodySnippet = await page.locator('body').innerText();
  console.log('BODY after first finish:', bodySnippet.slice(0, 800));

  await browser.close();
})();
