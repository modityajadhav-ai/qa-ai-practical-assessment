const { env } = require('../config/env.config');

/**
 * Authentication helper — manages login state and auth tokens.
 */
const authHelper = {
  /** Return credentials from environment variables. */
  getCredentials() {
    return {
      email: env.testUserEmail,
      password: env.testUserPassword,
    };
  },

  /**
   * Build a Bearer token header object.
   * @param {string} token
   */
  bearerHeader(token) {
    return { Authorization: `Bearer ${token}` };
  },
};

module.exports = { authHelper };
