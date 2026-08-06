const { request } = require('@playwright/test');
const { env } = require('../config/env.config');
const { HomePage } = require('../pages/HomePage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');

/**
 * Fetch in-stock product IDs from the API.
 */
async function getInStockProductIdsFromApi() {
  const apiContext = await request.newContext({ baseURL: env.apiBaseUrl });
  const response = await apiContext.get('/products');
  const body = await response.json();
  await apiContext.dispose();

  return body.data.filter((product) => product.in_stock).map((product) => product.id);
}

/**
 * Find product IDs that expose the Add to Cart button (in-stock items).
 * @param {import('@playwright/test').Page} page
 * @param {number} minCount
 */
async function findPurchasableProductIds(page, minCount = 1) {
  const apiIds = await getInStockProductIdsFromApi();
  const purchasable = [];
  const productPage = new ProductDetailPage(page);

  for (const id of apiIds) {
    await productPage.gotoProduct(id);
    const canAdd = await page.locator('[data-test="add-to-cart"]').isVisible();
    if (canAdd) {
      purchasable.push(id);
      if (purchasable.length >= minCount) break;
    }
  }

  if (purchasable.length >= minCount) {
    return purchasable;
  }

  const homePage = new HomePage(page);
  await homePage.goto();
  const linkIds = await homePage.getProductIdsFromLinks();

  for (const id of linkIds) {
    if (purchasable.includes(id)) continue;
    await productPage.gotoProduct(id);
    const canAdd = await page.locator('[data-test="add-to-cart"]').isVisible();
    if (canAdd) {
      purchasable.push(id);
      if (purchasable.length >= minCount) break;
    }
  }

  return purchasable;
}

module.exports = { findPurchasableProductIds, getInStockProductIdsFromApi };
