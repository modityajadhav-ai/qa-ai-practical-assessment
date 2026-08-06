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
    return `testuser_${this.randomString(6)}_${Date.now()}@example.com`;
  },

  /** Generate a unique password meeting SUT complexity rules. */
  randomPassword() {
    return `Zx9!mK${Date.now()}${this.randomString(3)}`;
  },

  /** Build a complete API registration payload. */
  buildRegistrationData() {
    return {
      first_name: 'Test',
      last_name: 'User',
      email: this.randomEmail(),
      password: this.randomPassword(),
      dob: '1990-05-15',
      phone: '555-123-4567',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        postal_code: '10001',
      },
    };
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
