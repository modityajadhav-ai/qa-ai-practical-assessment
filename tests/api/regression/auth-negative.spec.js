const { test, expect } = require('../../../fixtures/api.fixture');
const { AuthService } = require('../../../api/endpoints/AuthService');

test.describe('API Auth negative @api', () => {
  test('TC-API-08 should reject invalid bearer token @regression @api', async ({ request }) => {
    const authService = new AuthService(request);
    const response = await authService.getProfile('invalid-token-value');

    expect(response.status()).toBe(401);
  });
});
