const { test, expect } = require('../../../fixtures/api.fixture');
const { dataGenerator } = require('../../../utils/data-generator');

test.describe('API Cart @api', () => {
  test('TC-API-03 should create a new cart @smoke @api', async ({ authService, cartService }) => {
    const userData = dataGenerator.buildRegistrationData();
    await authService.register(userData);
    const loginResponse = await authService.login(userData.email, userData.password);
    const { access_token: token } = await loginResponse.json();

    const response = await cartService.createCart(token);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.id).toBeTruthy();
  });
});
