const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.waitForLoadState('networkidle');
  const loginInputs = await page.locator('input').evaluateAll((els) =>
    els.map((e) => ({ name: e.name, id: e.id, type: e.type })),
  );
  console.log('LOGIN:', JSON.stringify(loginInputs));

  await page.goto('https://practicesoftwaretesting.com/products');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const links = await page.locator('a').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href')).filter((h) => h && h.includes('product')),
  );
  console.log('PRODUCT LINKS:', JSON.stringify(links.slice(0, 5)));
  const tests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('DATA-TEST COUNT:', tests.length, tests.slice(0, 30));

  // login as default customer
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.waitForLoadState('networkidle');
  await page.locator('#email').fill('customer@practicesoftwaretesting.com');
  await page.locator('#password').fill('welcome01');
  const submitBtn = page.locator('button[type="submit"], input[type="submit"]');
  console.log('SUBMIT count:', await submitBtn.count());
  await submitBtn.first().click();
  await page.waitForTimeout(3000);
  console.log('URL after login:', page.url());
  console.log('NAV sign-in:', await page.locator('[data-test="nav-sign-in"]').innerText().catch(() => 'missing'));

  await page.goto('https://practicesoftwaretesting.com/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const homeLinks = await page.locator('a').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href')).filter(Boolean).slice(0, 30),
  );
  console.log('HOME links:', homeLinks);

  await page.goto('https://practicesoftwaretesting.com/category/hand-tools');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const catLinks = await page.locator('a').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href')).filter((h) => h && (h.includes('product') || h.includes('cart'))),
  );
  console.log('CATEGORY product/cart links:', catLinks.slice(0, 10));
  const catTests = await page.locator('[data-test]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('data-test')),
  );
  console.log('CATEGORY data-test:', catTests.filter((t) => t.includes('product') || t.includes('cart') || t.includes('add')));

  await browser.close();
})();
