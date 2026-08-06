/**
 * Generate random test data for dynamic test scenarios.
 */
const dataGenerator = {
  /** Generate a random alphanumeric string. */
  randomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  /** Generate a unique email address for test registration. */
  randomEmail() {
    return `testuser_${this.randomString(6)}@example.com`;
  },

  /** Generate a random integer within a range. */
  randomInt(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /** Pick a random item from an array. */
  pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
};

module.exports = { dataGenerator };
