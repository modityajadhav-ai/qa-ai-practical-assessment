const { test, expect } = require('../../../fixtures/ui.fixture');

test.describe('Products @ui', () => {
  test('TC-UI-04 should browse products listing @smoke @ui', async ({ homePage, page }) => {
    await homePage.goto();
    await expect(homePage.isLoaded()).resolves.toBe(true);

    const productIds = await homePage.getProductIdsFromLinks();
    expect(productIds.length).toBeGreaterThan(0);

    await page.locator(`a[href="/product/${productIds[0]}"]`).first().click();
    await expect(page.locator('[data-test="product-name"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });
});
