const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class ProductDetailPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} [productId]
   */
  constructor(page, productId = '') {
    super(page, productId ? `/product/${productId}` : ROUTES.PRODUCT_DETAIL);
    this.productId = productId;
  }

  async gotoProduct(productId) {
    await this.page.goto(`/product/${productId}`);
    await this.page.waitForLoadState('networkidle');
    await this.waitForPageLoad();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('[data-test="cart-quantity"]');
    if ((await badge.count()) === 0) {
      return 0;
    }

    const text = (await badge.textContent())?.trim() ?? '0';
    return Number.parseInt(text, 10) || 0;
  }

  async addToCart() {
    const expectedCount = (await this.getCartBadgeCount()) + 1;
    const addButton = this.page.locator('[data-test="add-to-cart"]');
    await addButton.waitFor({ state: 'visible', timeout: 15000 });

    const cartResponse = this.page.waitForResponse(
      (response) => response.url().includes('carts') && response.status() < 400,
      { timeout: 15000 },
    );

    await addButton.click();
    const response = await cartResponse;
    if (!response.ok()) {
      throw new Error(`Add to cart failed: ${response.status()} ${await response.text()}`);
    }

    const cartBadge = this.page.locator('[data-test="cart-quantity"]');
    await cartBadge.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForFunction(
      (minCount) => {
        const badge = document.querySelector('[data-test="cart-quantity"]');
        const count = Number.parseInt(badge?.textContent?.trim() || '0', 10);
        return count >= minCount;
      },
      expectedCount,
      { timeout: 15000 },
    );
  }

  async getProductName() {
    return (await this.page.locator('[data-test="product-name"]').textContent())?.trim() ?? '';
  }
}

module.exports = { ProductDetailPage };
