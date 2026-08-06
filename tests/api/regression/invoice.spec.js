const { test, expect } = require('../../../fixtures/api.fixture');
const { dataGenerator } = require('../../../utils/data-generator');
const { findInStockProduct } = require('../../../helpers/api.helper');
const { readJson } = require('../../../utils/file-reader');

test.describe('API Invoice @api', () => {
  test('TC-API-07 should generate invoice for cart @regression @api', async ({
    authService,
    productsService,
    cartService,
    invoicesService,
  }) => {
    const userData = dataGenerator.buildRegistrationData();
    await authService.register(userData);
    const loginResponse = await authService.login(userData.email, userData.password);
    const { access_token: token } = await loginResponse.json();

    const cartResponse = await cartService.createCart(token);
    const { id: cartId } = await cartResponse.json();

    const productsResponse = await productsService.getProducts();
    const product = findInStockProduct(await productsResponse.json());
    await cartService.addItem(token, cartId, product.id, 1);

    const invoiceTemplate = readJson('api/invoice-payload.json');
    const invoicePayload = { ...invoiceTemplate, cart_id: cartId };

    const response = await invoicesService.createInvoice(token, invoicePayload);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.invoice_number).toMatch(/^INV-/);
    expect(body.total).toBeGreaterThan(0);
  });
});
