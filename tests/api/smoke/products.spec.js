const { test, expect } = require('../../../fixtures/api.fixture');
const { findInStockProduct } = require('../../../helpers/api.helper');

test.describe('API Products @api', () => {
  test('TC-API-04 should retrieve products list @smoke @api', async ({ productsService }) => {
    const response = await productsService.getProducts();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(findInStockProduct(body)).toBeTruthy();
  });
});
