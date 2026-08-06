const { BaseApiClient } = require('../clients/BaseApiClient');
const { API_ENDPOINTS } = require('../../constants/api-endpoints');

class AuthService extends BaseApiClient {
  /**
   * @param {object} userData
   */
  register(userData) {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, { data: userData });
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, {
      data: { email, password },
    });
  }

  /**
   * @param {string} token
   */
  getProfile(token) {
    return this.get(API_ENDPOINTS.USERS.PROFILE, {
      headers: this.authHeaders(token),
    });
  }
}

module.exports = { AuthService };
