/**
 * Wait helper — reusable wait strategies beyond Playwright defaults.
 */
const waitHelper = {
  /**
   * Poll until a condition is true or timeout is reached.
   * @param {() => Promise<boolean>} condition
   * @param {number} timeoutMs
   * @param {number} intervalMs
   */
  async pollUntil(condition, timeoutMs = 10000, intervalMs = 500) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (await condition()) return;
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(`pollUntil timed out after ${timeoutMs}ms`);
  },
};

module.exports = { waitHelper };
