const { env } = require('../../config/env.config');

/**
 * Base API client — shared HTTP helpers for all API service classes.
 */
class BaseApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.baseUrl = env.apiBaseUrl;
  }

  /**
   * Build a full URL from a relative endpoint path.
   * @param {string} endpoint
   */
  buildUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Replace :param placeholders in an endpoint path.
   * @param {string} endpoint
   * @param {Record<string, string>} params
   */
  resolveEndpoint(endpoint, params = {}) {
    let resolved = endpoint;
    for (const [key, value] of Object.entries(params)) {
      resolved = resolved.replace(`:${key}`, value);
    }
    return resolved;
  }
}

module.exports = { BaseApiClient };
