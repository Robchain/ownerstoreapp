export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  ADMIN: {
    PRODUCTS: '/admin/products',
    SUPPLIERS: '/admin/suppliers',
    LOTS: '/admin/lots',
    PRODUCT_SUPPLIERS: '/admin/productsuppliers',
  },
  BUYER: {
    PRODUCTS: '/buyer/products',
    CART: '/buyer/cart',
    WISHLIST: '/buyer/wishlist',
  },
} as const;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5100/api',
  TIMEOUT: 10000,
} as const;
