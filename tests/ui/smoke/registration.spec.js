const { test, expect } = require('../../../fixtures/ui.fixture');
const { dataGenerator } = require('../../../utils/data-generator');
const { readJson } = require('../../../utils/file-reader');

test.describe('Registration @ui', () => {
  test('TC-UI-01 should register new user with valid details @smoke @regression @ui', async ({
    registerPage,
    page,
  }) => {
    const template = readJson('ui/registration-user.json');
    const user = {
      ...template,
      email: dataGenerator.randomEmail(),
      password: dataGenerator.randomPassword(),
    };

    await registerPage.goto();
    await registerPage.register(user);

    await expect(page).not.toHaveURL(/\/auth\/register/);
    await expect(registerPage.isRegistrationSuccessful()).resolves.toBe(true);
  });
});
