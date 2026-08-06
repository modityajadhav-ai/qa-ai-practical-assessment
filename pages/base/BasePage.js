/**
 * Base Page Object — shared behaviour for all UI page classes.
 * Extend this class when creating new page objects.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} path
   */
  constructor(page, path = '/') {
    this.page = page;
    this.path = path;
  }

  /**
   * Navigate to this page's path.
   * @param {Record<string, string>} [params]
   */
  async goto(params = {}) {
    let url = this.path;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, value);
    }
    await this.page.goto(url);
  }

  /** Wait for the page to reach a stable loaded state. */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { BasePage };
