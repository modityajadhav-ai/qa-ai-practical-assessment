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
  await page.waitForLoadState('networkidle');
  const productTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('PRODUCT PAGE data-test:', productTests);

  const addBtn = page.locator('[data-test="add-to-cart"]');
  console.log('add-to-cart exists:', await addBtn.count());
  if (await addBtn.count()) {
    await addBtn.click();
    await page.waitForTimeout(2000);
  }

  await page.goto('https://practicesoftwaretesting.com/cart');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const cartTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('CART data-test:', cartTests);

  await page.goto('https://practicesoftwaretesting.com/checkout');
  await page.waitForLoadState('networkidle');
  const checkoutTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('CHECKOUT data-test:', checkoutTests);
  const checkoutInputs = await page.locator('input, select, button').evaluateAll((els) =>
    els.map((e) => ({
      tag: e.tagName,
      id: e.id,
      name: e.name,
      type: e.type,
      test: e.getAttribute('data-test'),
      text: e.innerText?.slice(0, 30),
    })),
  );
  console.log('CHECKOUT fields:', JSON.stringify(checkoutInputs.slice(0, 25)));

  await browser.close();
})();
