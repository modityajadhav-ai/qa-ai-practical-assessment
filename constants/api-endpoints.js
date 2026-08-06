/**
 * API endpoint path constants.
 * Base URL is configured via API_BASE_URL in .env.
 */
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/users/login',
    REGISTER: '/api/users/register',
    LOGOUT: '/api/users/logout',
  },
  USERS: {
    LIST: '/api/users',
    BY_ID: '/api/users/:id',
    PROFILE: '/api/users/me',
  },
  PRODUCTS: {
    LIST: '/api/products',
    BY_ID: '/api/products/:id',
    SEARCH: '/api/products/search',
  },
  CATEGORIES: {
    LIST: '/api/categories',
    BY_ID: '/api/categories/:id',
  },
  BRANDS: {
    LIST: '/api/brands',
    BY_ID: '/api/brands/:id',
  },
  IMAGES: {
    LIST: '/api/images',
    BY_ID: '/api/images/:id',
  },
};

module.exports = { API_ENDPOINTS };
