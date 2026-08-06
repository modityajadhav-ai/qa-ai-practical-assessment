const { BaseApiClient } = require('../clients/BaseApiClient');
const { API_ENDPOINTS } = require('../../constants/api-endpoints');

class InvoicesService extends BaseApiClient {
  /**
   * @param {string} token
   * @param {object} invoiceData
   */
  createInvoice(token, invoiceData) {
    return this.post(API_ENDPOINTS.INVOICES.CREATE, {
      headers: this.authHeaders(token),
      data: invoiceData,
    });
  }
}

module.exports = { InvoicesService };
