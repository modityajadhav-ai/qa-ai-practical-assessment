const { LoginPage } = require('../pages/LoginPage');
const { TEST_USERS } = require('../constants/test-users');
const { env } = require('../config/env.config');
const { readJson } = require('../utils/file-reader');
const { dataGenerator } = require('../utils/data-generator');

/**
 * Build a unique UI user from the registration template.
 */
function buildUiUser() {
  const template = readJson('ui/registration-user.json');
  return {
    firstName: template.firstName,
    lastName: template.lastName,
    email: dataGenerator.randomEmail(),
    password: dataGenerator.randomPassword(),
    dob: template.dob,
    country: template.country,
    postalCode: template.postalCode,
    houseNumber: template.houseNumber,
    phone: template.phone,
  };
}

/**
 * Register a user via API (fast setup for UI login flows).
 * @param {import('@playwright/test').Page} page
 * @param {ReturnType<typeof buildUiUser>} user
 */
async function registerUserViaApi(page, user) {
  const response = await page.request.post(`${env.apiBaseUrl}/users/register`, {
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      dob: user.dob,
      phone: user.phone,
      address: {
        street: `${user.houseNumber} Main Street`,
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        postal_code: user.postalCode,
      },
    },
  });

  if (response.status() !== 201) {
    throw new Error(`API registration failed: ${response.status()} ${await response.text()}`);
  }
}

/**
 * Log in via UI and wait for authenticated shell.
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} password
 */
async function loginViaUi(page, email, password) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);
  await page.locator('[data-test="nav-menu"]').waitFor({ state: 'visible', timeout: 20000 });
}

/**
 * Register a fresh user via API then log in via UI.
 * @param {import('@playwright/test').Page} page
 */
async function registerAndLogin(page) {
  const user = buildUiUser();
  await registerUserViaApi(page, user);
  await loginViaUi(page, user.email, user.password);
  return user;
}

/**
 * Log in for UI tests. Uses TEST_USER_* from .env when set; otherwise registers a new user.
 * The shared demo customer account is often locked after repeated runs.
 * @param {import('@playwright/test').Page} page
 */
async function loginAsCustomer(page) {
  if (env.testUserEmail && env.testUserPassword) {
    await loginViaUi(page, env.testUserEmail, env.testUserPassword);
    return {
      email: env.testUserEmail,
      firstName: TEST_USERS.CUSTOMER.firstName,
      lastName: TEST_USERS.CUSTOMER.lastName,
    };
  }

  return registerAndLogin(page);
}

module.exports = {
  buildUiUser,
  registerUserViaApi,
  loginViaUi,
  registerAndLogin,
  loginAsCustomer,
};
