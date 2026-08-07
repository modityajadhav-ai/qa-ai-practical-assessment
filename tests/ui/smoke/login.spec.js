const { test, expect } = require('../../../fixtures/ui.fixture');
const { buildUiUser, registerUserViaApi } = require('../../../helpers/ui-auth.helper');

test.describe('Login @ui', () => {
  test('TC-UI-02 should login with valid credentials @smoke @regression @ui', async ({
    loginPage,
    page,
  }) => {
    const user = buildUiUser();
    await registerUserViaApi(page, user);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
  });
});
