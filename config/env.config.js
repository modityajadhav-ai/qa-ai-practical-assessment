const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Centralised environment configuration.
 * All runtime values are sourced from .env with safe defaults.
 */
const env = {
  baseUrl: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com',

  testUserEmail: process.env.TEST_USER_EMAIL || '',
  testUserPassword: process.env.TEST_USER_PASSWORD || '',

  testTimeout: Number(process.env.TEST_TIMEOUT) || 60000,
  expectTimeout: Number(process.env.EXPECT_TIMEOUT) || 10000,
  actionTimeout: Number(process.env.ACTION_TIMEOUT) || 15000,
  navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,

  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO) || 0,

  reportTitle: process.env.REPORT_TITLE || 'QA Automation Test Report',

  isCI: !!process.env.CI,
};

module.exports = { env };
