const { test as base } = require('@playwright/test');
const { BasePage } = require('../../pages/base/BasePage');

/**
 * Extended Playwright test fixture for UI tests.
 * Provides shared page object instances via the test context.
 *
 * Usage:
 *   const { test, expect } = require('../../fixtures/ui.fixture');
 */
const test = base.extend({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

const expect = test.expect;

module.exports = { test, expect };
