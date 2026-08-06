const { test, expect } = require('../../../fixtures/ui.fixture');
const { loginAsCustomer } = require('../../../helpers/ui-auth.helper');
const { TEST_USERS } = require('../../../constants/test-users');

test.describe('Profile @ui', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test('TC-UI-03 should verify profile information after login @smoke @ui', async ({
    profilePage,
    page,
  }) => {
    await profilePage.goto();
    await expect(page.getByLabel('Email address')).not.toHaveValue('', { timeout: 15000 });

    await expect(profilePage.getEmail()).resolves.toBe(TEST_USERS.CUSTOMER.email);
    await expect(profilePage.getFirstName()).resolves.toBe(TEST_USERS.CUSTOMER.firstName);
    await expect(profilePage.getLastName()).resolves.toBe(TEST_USERS.CUSTOMER.lastName);
  });
});
