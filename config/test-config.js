/**
 * Static test configuration constants (not environment-driven).
 */
const testConfig = {
  retries: {
    smoke: 1,
    regression: 0,
  },

  tags: {
    smoke: '@smoke',
    regression: '@regression',
    ui: '@ui',
    api: '@api',
  },

  screenshotDir: 'screenshots',
  authStatePath: '.auth/user.json',
};

module.exports = { testConfig };
