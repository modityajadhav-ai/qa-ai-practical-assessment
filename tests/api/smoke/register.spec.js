const { test, expect } = require('../../../fixtures/api.fixture');
const { dataGenerator } = require('../../../utils/data-generator');

test.describe('API Registration @api', () => {
  test('TC-API-01 should register a new user @smoke @api', async ({ authService }) => {
    const userData = dataGenerator.buildRegistrationData();
    const response = await authService.register(userData);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.email).toBe(userData.email);
    expect(body.id).toBeTruthy();
  });
});
