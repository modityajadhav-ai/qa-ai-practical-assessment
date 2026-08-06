/**
 * API endpoint path constants.
 * Base URL is configured via API_BASE_URL in .env (no /api prefix).
 */
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
  },
  USERS: {
    LIST: '/users',
    BY_ID: '/users/:id',
    PROFILE: '/users/me',
  },
  PRODUCTS: {
    LIST: '/products',
    BY_ID: '/products/:id',
    SEARCH: '/products/search',
  },
  CARTS: {
    CREATE: '/carts',
    BY_ID: '/carts/:id',
    ADD_ITEM: '/carts/:id',
  },
  INVOICES: {
    CREATE: '/invoices',
    BY_ID: '/invoices/:id',
    SEARCH: '/invoices/search',
  },
  CATEGORIES: {
    LIST: '/categories',
    BY_ID: '/categories/:id',
  },
  BRANDS: {
    LIST: '/brands',
    BY_ID: '/brands/:id',
  },
};

module.exports = { API_ENDPOINTS };
