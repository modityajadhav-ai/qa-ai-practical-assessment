const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class HomePage extends BasePage {
  constructor(page) {
    super(page, ROUTES.HOME);
  }

  async getProductIdsFromLinks() {
    await this.page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
    const hrefs = await this.page.locator('a[href^="/product/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')?.replace('/product/', '') ?? ''),
    );
    return [...new Set(hrefs.filter(Boolean))];
  }

  /** @deprecated Use getProductIdsFromLinks — kept for compatibility */
  async getVisibleProductIds() {
    return this.getProductIdsFromLinks();
  }

  async isLoaded() {
    try {
      await this.page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { HomePage };
