const { test, expect } = require('../../../fixtures/ui.fixture');
const { loginAsCustomer } = require('../../../helpers/ui-auth.helper');

test.describe('Profile @ui', () => {
  let user;

  test.beforeEach(async ({ page }) => {
    user = await loginAsCustomer(page);
  });

  test('TC-UI-03 should verify profile information after login @smoke @ui', async ({
    profilePage,
    page,
  }) => {
    await profilePage.goto();
    await expect(page.getByLabel('Email address')).not.toHaveValue('', { timeout: 15000 });

    await expect(profilePage.getEmail()).resolves.toBe(user.email);
    await expect(profilePage.getFirstName()).resolves.toBe(user.firstName);
    await expect(profilePage.getLastName()).resolves.toBe(user.lastName);
  });
});
