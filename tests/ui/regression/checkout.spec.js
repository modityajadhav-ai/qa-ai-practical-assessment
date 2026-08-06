const { test, expect } = require('../../../fixtures/ui.fixture');
const { loginAsCustomer } = require('../../../helpers/ui-auth.helper');
const { findPurchasableProductIds } = require('../../../helpers/ui-products.helper');
const { ProductDetailPage } = require('../../../pages/ProductDetailPage');

test.describe('Checkout @ui', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test('TC-UI-07 should complete COD checkout and view invoice @regression @ui', async ({
    checkoutPage,
    invoicesPage,
    page,
  }) => {
    const productIds = await findPurchasableProductIds(page, 1);
    const productPage = new ProductDetailPage(page);
    await productPage.gotoProduct(productIds[0]);
    await productPage.addToCart();
    await expect(page.locator('[data-test="cart-quantity"]')).not.toHaveText('0', { timeout: 10000 });

    await checkoutPage.goto();
    await checkoutPage.proceedToBilling();
    await checkoutPage.fillBillingAddress();
    await checkoutPage.proceedToPayment();
    await checkoutPage.selectCashOnDelivery();
    await checkoutPage.confirmPaymentTwice();

    await invoicesPage.goto();
    await expect(invoicesPage.hasInvoiceTable()).resolves.toBe(true);
    const invoiceNumbers = await invoicesPage.getInvoiceNumbers();
    expect(invoiceNumbers.some((num) => num.startsWith('INV-'))).toBe(true);
  });
});
