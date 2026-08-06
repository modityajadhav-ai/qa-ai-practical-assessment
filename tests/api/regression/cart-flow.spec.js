const { test, expect } = require('../../../fixtures/api.fixture');
const { dataGenerator } = require('../../../utils/data-generator');
const { findInStockProduct } = require('../../../helpers/api.helper');

test.describe('API Cart flow @api', () => {
  let token;
  let cartId;
  let productId;

  test.beforeEach(async ({ authService, productsService, cartService }) => {
    const userData = dataGenerator.buildRegistrationData();
    await authService.register(userData);
    const loginResponse = await authService.login(userData.email, userData.password);
    const loginBody = await loginResponse.json();
    token = loginBody.access_token;

    const productsResponse = await productsService.getProducts();
    const productsBody = await productsResponse.json();
    const product = findInStockProduct(productsBody);
    productId = product.id;

    const cartResponse = await cartService.createCart(token);
    const cartBody = await cartResponse.json();
    cartId = cartBody.id;
  });

  test('TC-API-05 should add product to cart @regression @api', async ({ cartService }) => {
    const response = await cartService.addItem(token, cartId, productId, 1);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.result).toBe('item added or updated');
  });

  test('TC-API-06 should verify cart contents @regression @api', async ({ cartService }) => {
    await cartService.addItem(token, cartId, productId, 2);

    const response = await cartService.getCart(token, cartId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.cart_items.length).toBeGreaterThan(0);
    expect(body.cart_items[0].product_id).toBe(productId);
    expect(body.cart_items[0].quantity).toBe(2);
  });
});
