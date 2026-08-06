const { test, expect } = require('../../../fixtures/ui.fixture');
const { TEST_USERS } = require('../../../constants/test-users');

test.describe('Login @ui', () => {
  test('TC-UI-02 should login with valid credentials @smoke @regression @ui', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(TEST_USERS.CUSTOMER.email, TEST_USERS.CUSTOMER.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
  });
});
