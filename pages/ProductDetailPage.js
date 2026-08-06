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

  async addToCart() {
    const addButton = this.page.locator('[data-test="add-to-cart"]');
    await addButton.waitFor({ state: 'visible', timeout: 15000 });

    const cartResponse = this.page.waitForResponse(
      (response) => response.url().includes('carts') && response.status() < 400,
      { timeout: 15000 },
    );

    await addButton.click();
    await cartResponse.catch(() => null);
    await this.page.waitForTimeout(1500);
  }

  async getProductName() {
    return (await this.page.locator('[data-test="product-name"]').textContent())?.trim() ?? '';
  }
}

module.exports = { ProductDetailPage };
