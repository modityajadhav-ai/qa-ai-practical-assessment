const { test, expect } = require('../../../fixtures/ui.fixture');
const { loginAsCustomer } = require('../../../helpers/ui-auth.helper');
const { findPurchasableProductIds } = require('../../../helpers/ui-products.helper');
const { ProductDetailPage } = require('../../../pages/ProductDetailPage');

test.describe('Cart @ui', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test('TC-UI-06 should update product quantity in cart @regression @ui', async ({
    checkoutPage,
    page,
  }) => {
    const productIds = await findPurchasableProductIds(page, 1);
    const productPage = new ProductDetailPage(page);
    await productPage.gotoProduct(productIds[0]);
    await productPage.addToCart();

    await checkoutPage.goto();
    const qtyInput = page.locator('[data-test="product-quantity"]').first();
    const initialQty = Number(await qtyInput.inputValue());
    await checkoutPage.updateLineQuantity(0, initialQty + 1);

    await expect(qtyInput).toHaveValue(String(initialQty + 1), { timeout: 10000 });
  });

  test('TC-UI-05 should add multiple products to cart @regression @ui', async ({
    checkoutPage,
    page,
  }) => {
    const productIds = await findPurchasableProductIds(page, 2);
    expect(productIds.length).toBeGreaterThanOrEqual(2);
    expect(new Set(productIds).size).toBeGreaterThanOrEqual(2);

    const productPage = new ProductDetailPage(page);
    await productPage.gotoProduct(productIds[0]);
    await productPage.addToCart();
    await productPage.gotoProduct(productIds[1]);
    await productPage.addToCart();

    await checkoutPage.goto();
    await checkoutPage.waitForMinCartLines(2);
    await expect(checkoutPage.getCartLineCount()).resolves.toBeGreaterThanOrEqual(2);
  });
});
