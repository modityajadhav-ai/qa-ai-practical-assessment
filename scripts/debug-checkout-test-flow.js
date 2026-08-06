const { chromium, request } = require('playwright');
const { CheckoutPage } = require('../pages/CheckoutPage');

(async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.practicesoftwaretesting.com',
  });
  const products = await (await apiContext.get('/products')).json();
  const productId = products.data.find((p) => p.in_stock)?.id;
  await apiContext.dispose();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const base = 'https://practicesoftwaretesting.com';

  await page.goto(`${base}/auth/login`);
  await page.locator('#email').fill('customer@practicesoftwaretesting.com');
  await page.locator('#password').fill('welcome01');
  await page.locator('input[type=submit]').click();
  await page.locator('[data-test="nav-menu"]').waitFor();

  await page.goto(`${base}/product/${productId}`);
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(2000);

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();
  await checkoutPage.proceedToBilling();

  console.log('#country count:', await page.locator('#country').count());
  const countries = await page.locator('#country').evaluateAll((els) =>
    els.map((e) => ({ visible: e.offsetParent !== null, value: e.value })),
  );
  console.log('#country elements:', countries);

  await checkoutPage.fillBillingAddress();
  console.log('after fill:', {
    country: await page.locator('#country').inputValue(),
    postal: await page.locator('#postal_code').inputValue(),
    house: await page.locator('#house_number').inputValue(),
    proceed3: await page.locator('[data-test="proceed-3"]').isEnabled(),
  });

  await browser.close();
})();
