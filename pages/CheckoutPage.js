const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page, ROUTES.CHECKOUT);
  }

  async goto() {
    const navCart = this.page.locator('[data-test="nav-cart"]');
    await navCart.waitFor({ state: 'visible', timeout: 15000 });
    await navCart.click();
    await this.page.waitForLoadState('networkidle');
    await this.waitForCartStep();
  }

  async waitForCartStep() {
    await this.page.locator('[data-test="proceed-1"], [data-test="product-title"]').first().waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  async proceedToBilling() {
    await this.page.locator('[data-test="proceed-1"]').click();
    await this.page.locator('[data-test="proceed-2"]').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('[data-test="proceed-2"]').click();
    await this.page.getByRole('heading', { name: 'Billing Address' }).waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  /**
   * @param {object} [address]
   */
  async fillBillingAddress(address = {}) {
    const defaults = {
      country: 'United States of America (the)',
      postalCode: '33101',
      houseNumber: '123',
    };
    const billing = { ...defaults, ...address };

    const country = this.page.locator('[data-test="country"]');
    await country.waitFor({ state: 'visible', timeout: 15000 });
    await country.selectOption({ label: billing.country });

    const postalCode = this.page.locator('[data-test="postal_code"]');
    await postalCode.fill(billing.postalCode);
    await postalCode.press('Tab');

    const houseNumber = this.page.locator('[data-test="house_number"]');
    await houseNumber.fill(billing.houseNumber);
    await houseNumber.press('Tab');

    await this.page.waitForResponse(
      (response) => response.url().includes('postcode-lookup') && response.status() < 400,
      { timeout: 15000 },
    ).catch(() => null);

    await this.page.locator('[data-test="proceed-3"]:enabled').waitFor({
      state: 'visible',
      timeout: 20000,
    });
  }

  async proceedToPayment() {
    await this.page.locator('[data-test="proceed-3"]:enabled').click();
    await this.page.locator('#payment-method').waitFor({ state: 'visible', timeout: 15000 });
  }

  async selectCashOnDelivery() {
    await this.page.locator('#payment-method').selectOption('cash-on-delivery');
  }

  async confirmPaymentTwice() {
    const finish = this.page.locator('[data-test="finish"]');

    const paymentCheck = this.page.waitForResponse(
      (response) => response.url().includes('/payment/check') && response.ok(),
      { timeout: 20000 },
    );
    await finish.click();
    await paymentCheck;
    await this.page.getByText('Payment was successful').waitFor({
      state: 'visible',
      timeout: 15000,
    });

    const invoiceCreate = this.page.waitForResponse(
      (response) => response.url().includes('/invoices') && response.status() === 201,
      { timeout: 20000 },
    );
    await finish.click();
    await invoiceCreate;
    await this.page.getByText(/invoice number is INV-/i).waitFor({
      state: 'visible',
      timeout: 20000,
    });
  }

  /**
   * @param {number} lineIndex
   * @param {number} quantity
   */
  async updateLineQuantity(lineIndex, quantity) {
    const quantityInput = this.page.locator('[data-test="product-quantity"]').nth(lineIndex);
    await quantityInput.fill(String(quantity));
    await quantityInput.press('Enter');
    await this.page.waitForTimeout(1500);
  }

  async getCartLineCount() {
    return this.page.locator('[data-test="product-title"]').count();
  }

  async getCartTotal() {
    await this.page.locator('[data-test="cart-total"]').waitFor({ state: 'visible', timeout: 15000 });
    return (await this.page.locator('[data-test="cart-total"]').textContent())?.trim() ?? '';
  }

  async isPaymentSuccessful() {
    const body = await this.page.locator('body').innerText();
    return body.includes('invoice number is INV-');
  }
}

module.exports = { CheckoutPage };
