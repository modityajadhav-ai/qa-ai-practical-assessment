const { LoginPage } = require('../pages/LoginPage');
const { TEST_USERS } = require('../constants/test-users');

/**
 * Log in via UI using the default demo customer account.
 * @param {import('@playwright/test').Page} page
 */
async function loginAsCustomer(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_USERS.CUSTOMER.email, TEST_USERS.CUSTOMER.password);
  await page.locator('[data-test="nav-menu"]').waitFor({ state: 'visible', timeout: 20000 });
}

module.exports = { loginAsCustomer };
