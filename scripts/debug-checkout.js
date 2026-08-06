const { chromium, request } = require('playwright');

(async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.practicesoftwaretesting.com',
  });
  const productsRes = await apiContext.get('/products');
  const products = await productsRes.json();
  const productId = products.data.find((p) => p.in_stock)?.id;
  await apiContext.dispose();

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('#email').fill('customer@practicesoftwaretesting.com');
  await page.locator('#password').fill('welcome01');
  await page.locator('input[type=submit]').click();
  await page.locator('[data-test="nav-menu"]').waitFor();

  await page.goto(`https://practicesoftwaretesting.com/product/${productId}`);
  await page.locator('[data-test="add-to-cart"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(2000);

  await page.locator('[data-test="nav-cart"]').click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="proceed-1"]').click();
  await page.locator('[data-test="proceed-2"]').click();
  await page.waitForTimeout(1000);

  console.log('#country total:', await page.locator('#country').count());
  console.log('#postal_code total:', await page.locator('#postal_code').count());


  const countryById = await page.locator('#country').count();
  const countryByLabel = await page.getByLabel('Country').count();
  console.log('#country count:', countryById, 'getByLabel Country:', countryByLabel);

  const usOptions = await page.locator('#country option').evaluateAll((o) =>
    o.map((x) => x.textContent?.trim()).filter((t) => t && t.includes('United States')),
  );
  console.log('US options:', usOptions);

  // Test fill with #id selectors (current CheckoutPage approach)
  await page.locator('#country').selectOption({ label: 'United States of America (the)' });
  await page.locator('#postal_code').fill('33101');
  await page.locator('#house_number').fill('123');
  await page.waitForTimeout(3000);

  const valsId = {
    country: await page.locator('#country').inputValue(),
    postal: await page.locator('#postal_code').inputValue(),
    house: await page.locator('#house_number').inputValue(),
    proceed3Enabled: await page.locator('[data-test="proceed-3"]').isEnabled(),
  };
  console.log('after #id fill:', valsId);

  if (valsId.proceed3Enabled) {
    await page.locator('[data-test="proceed-3"]').click();
    await page.locator('#payment-method').selectOption('cash-on-delivery');
    await page.locator('[data-test="finish"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="finish"]').click();
    await page.waitForTimeout(5000);
    const tests = await page.locator('[data-test]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('data-test')),
    );
    console.log('data-test after payment:', tests);
    const bodySnippet = (await page.locator('body').innerText()).slice(0, 500);
    console.log('body snippet:', bodySnippet);

    await page.locator('[data-test="nav-menu"]').click();
    await page.locator('[data-test="nav-my-invoices"]').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const tableVisible = await page.locator('table').isVisible();
    console.log('invoice table:', tableVisible);
    if (tableVisible) {
      const firstCell = await page.locator('table tbody tr td').first().textContent();
      console.log('first invoice:', firstCell?.trim());
    }
  }

  await browser.close();
})();
