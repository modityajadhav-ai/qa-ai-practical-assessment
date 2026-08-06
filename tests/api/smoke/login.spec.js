const { test, expect } = require('../../../fixtures/api.fixture');
const { dataGenerator } = require('../../../utils/data-generator');

test.describe('API Login @api', () => {
  test('TC-API-02 should login and return bearer token @smoke @regression @api', async ({
    authService,
  }) => {
    const userData = dataGenerator.buildRegistrationData();
    const registerResponse = await authService.register(userData);
    expect(registerResponse.status()).toBe(201);

    const loginResponse = await authService.login(userData.email, userData.password);
    expect(loginResponse.status()).toBe(200);

    const body = await loginResponse.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toBe('bearer');
  });
});
