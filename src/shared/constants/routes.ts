export const ROUTES = {
  LOGIN: '/login',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    SUPPLIERS: '/admin/suppliers',
    LOTS: '/admin/lots',
  },
  BUYER: {
    PRODUCTS: '/buyer/products',
    CART: '/buyer/cart',
    WISHLIST: '/buyer/wishlist',
  },
} as const;