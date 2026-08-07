const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class LoginPage extends BasePage {
  constructor(page) {
    super(page, ROUTES.LOGIN);
  }

  /**
   * Submit login form and return whether the API accepted credentials.
   * @param {string} email
   * @param {string} password
   */
  async attemptLogin(email, password) {
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);

    const loginResponse = this.page.waitForResponse(
      (response) => response.url().includes('/users/login'),
      { timeout: 20000 },
    );
    await this.page.getByRole('button', { name: 'Login' }).click();
    const response = await loginResponse;
    const status = response.status();
    let body = '';

    if (!response.ok()) {
      try {
        body = await response.text();
      } catch {
        body = '';
      }
    }

    return {
      ok: response.ok(),
      status,
      body,
    };
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const result = await this.attemptLogin(email, password);

    if (!result.ok) {
      throw new Error(`Login failed (${result.status}): ${result.body}`);
    }

    await this.page.waitForURL(/\/account/, { timeout: 20000 });
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
