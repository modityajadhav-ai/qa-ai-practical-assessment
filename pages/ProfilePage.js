const { BasePage } = require('./base/BasePage');
const { ROUTES } = require('../constants/routes');

class ProfilePage extends BasePage {
  constructor(page) {
    super(page, ROUTES.PROFILE);
  }

  async waitForProfileForm() {
    await this.page.getByLabel('Email address').waitFor({ state: 'visible', timeout: 15000 });
  }

  async getEmail() {
    await this.waitForProfileForm();
    return this.page.getByLabel('Email address').inputValue();
  }

  async getFirstName() {
    await this.waitForProfileForm();
    return this.page.getByLabel('First name').inputValue();
  }

  async getLastName() {
    await this.waitForProfileForm();
    return this.page.getByLabel('Last name').inputValue();
  }
}

module.exports = { ProfilePage };
