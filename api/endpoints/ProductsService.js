const { BaseApiClient } = require('../clients/BaseApiClient');
const { API_ENDPOINTS } = require('../../constants/api-endpoints');

class ProductsService extends BaseApiClient {
  getProducts() {
    return this.get(API_ENDPOINTS.PRODUCTS.LIST);
  }

  /**
   * @param {string} productId
   */
  getProductById(productId) {
    const endpoint = this.resolveEndpoint(API_ENDPOINTS.PRODUCTS.BY_ID, { id: productId });
    return this.get(endpoint);
  }
}

module.exports = { ProductsService };
