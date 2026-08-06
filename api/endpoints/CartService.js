const { BaseApiClient } = require('../clients/BaseApiClient');
const { API_ENDPOINTS } = require('../../constants/api-endpoints');

class CartService extends BaseApiClient {
  /**
   * @param {string} [token]
   */
  createCart(token) {
    const headers = token ? this.authHeaders(token) : {};
    return this.post(API_ENDPOINTS.CARTS.CREATE, { headers });
  }

  /**
   * @param {string} token
   * @param {string} cartId
   * @param {string} productId
   * @param {number} quantity
   */
  addItem(token, cartId, productId, quantity = 1) {
    const endpoint = this.resolveEndpoint(API_ENDPOINTS.CARTS.ADD_ITEM, { id: cartId });
    return this.post(endpoint, {
      headers: this.authHeaders(token),
      data: { product_id: productId, quantity },
    });
  }

  /**
   * @param {string} token
   * @param {string} cartId
   */
  getCart(token, cartId) {
    const endpoint = this.resolveEndpoint(API_ENDPOINTS.CARTS.BY_ID, { id: cartId });
    return this.get(endpoint, { headers: this.authHeaders(token) });
  }
}

module.exports = { CartService };
