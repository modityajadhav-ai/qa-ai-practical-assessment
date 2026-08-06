const { test as base } = require('@playwright/test');
const { BaseApiClient } = require('../api/clients/BaseApiClient');

/**
 * Extended Playwright test fixture for API tests.
 * Provides a shared API client via the test context.
 *
 * Usage:
 *   const { test, expect } = require('../../fixtures/api.fixture');
 */
const test = base.extend({
  apiClient: async ({ request }, use) => {
    await use(new BaseApiClient(request));
  },
});

const expect = test.expect;

module.exports = { test, expect };
