const { test: base } = require('@playwright/test');
const { AuthService } = require('../api/endpoints/AuthService');
const { ProductsService } = require('../api/endpoints/ProductsService');
const { CartService } = require('../api/endpoints/CartService');
const { InvoicesService } = require('../api/endpoints/InvoicesService');

const test = base.extend({
  authService: async ({ request }, use) => {
    await use(new AuthService(request));
  },
  productsService: async ({ request }, use) => {
    await use(new ProductsService(request));
  },
  cartService: async ({ request }, use) => {
    await use(new CartService(request));
  },
  invoicesService: async ({ request }, use) => {
    await use(new InvoicesService(request));
  },
});

const expect = test.expect;

module.exports = { test, expect };
