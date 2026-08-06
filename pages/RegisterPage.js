const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page, ROUTES.REGISTER);
  }

  /**
   * @param {object} user
   */
  async register(user) {
    await this.page.locator('#first_name').fill(user.firstName);
    await this.page.locator('#last_name').fill(user.lastName);
    await this.page.locator('#dob').fill(user.dob);
    await this.page.locator('#country').selectOption({ label: user.country });
    await this.page.locator('#postal_code').fill(user.postalCode);
    await this.page.locator('#house_number').fill(user.houseNumber);
    await this.page.waitForTimeout(1500);
    await this.page.locator('#phone').fill(user.phone);
    await this.page.locator('#email').fill(user.email);
    await this.page.locator('#password').fill(user.password);
    await this.page.locator('[data-test="register-submit"]').click();
  }

  async isRegistrationSuccessful() {
    await this.page.waitForURL((url) => !url.pathname.includes('/auth/register'), {
      timeout: 15000,
    });
    return !this.page.url().includes('/auth/register');
  }
}

module.exports = { RegisterPage };
