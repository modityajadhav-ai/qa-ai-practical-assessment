// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { env } = require('./config/env.config');

/**
 * Playwright configuration for UI and API test execution.
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: env.testTimeout,
  expect: {
    timeout: env.expectTimeout,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/json/test-results.json' }],
    ['junit', { outputFile: 'reports/junit/test-results.xml' }],
  ],

  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: env.actionTimeout,
    navigationTimeout: env.navigationTimeout,
  },

  projects: [
    // ── UI (Chromium only) ─────────────────────────────────────
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      testMatch: '**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.baseUrl,
      },
    },

    // ── API ────────────────────────────────────────────────────
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: '**/*.spec.js',
      use: {
        baseURL: env.apiBaseUrl,
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
  ],

  outputDir: 'reports/test-results',
});
