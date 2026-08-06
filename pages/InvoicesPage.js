const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class InvoicesPage extends BasePage {
  constructor(page) {
    super(page, ROUTES.INVOICES);
  }

  async goto() {
    const navMenu = this.page.locator('[data-test="nav-menu"]');
    const navInvoices = this.page.locator('[data-test="nav-my-invoices"]');

    if (await navMenu.isVisible()) {
      await navMenu.click();
      await navInvoices.waitFor({ state: 'visible', timeout: 10000 });
      await navInvoices.click();
    } else {
      await super.goto();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoiceNumbers() {
    await this.page.locator('table').waitFor({ state: 'visible', timeout: 15000 });
    const rows = this.page.locator('table tbody tr');
    const count = await rows.count();
    const numbers = [];

    for (let i = 0; i < count; i++) {
      const firstCell = rows.nth(i).locator('td').first();
      if (await firstCell.count() > 0) {
        numbers.push((await firstCell.textContent())?.trim() ?? '');
      }
    }

    return numbers;
  }

  async hasInvoiceTable() {
    try {
      await this.page.locator('table').waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { InvoicesPage };
