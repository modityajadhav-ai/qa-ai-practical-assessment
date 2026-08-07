const { test, expect } = require('../../../fixtures/ui.fixture');

test.describe('Login negative @ui', () => {
  test('TC-UI-08 should reject invalid login credentials @regression @ui', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    const result = await loginPage.attemptLogin('invalid@example.com', 'WrongPass99!');
    expect(result.ok).toBe(false);

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });
});
