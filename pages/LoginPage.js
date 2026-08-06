const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class LoginPage extends BasePage {
  constructor(page) {
    super(page, ROUTES.LOGIN);
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.locator('input[type="submit"]').click();
  }

  async getErrorMessage() {
    const alert = this.page.locator('.alert, [role="alert"], .invalid-feedback, .text-danger');
    if (await alert.count() === 0) return '';
    return (await alert.first().textContent())?.trim() ?? '';
  }

  async hasLoginError() {
    const message = await this.getErrorMessage();
    if (message.length > 0) return true;
    const body = await this.page.locator('body').innerText();
    return /invalid|incorrect|wrong|failed|error|credentials/i.test(body);
  }

  async isOnLoginPage() {
    return this.page.url().includes('/auth/login');
  }
}

module.exports = { LoginPage };
