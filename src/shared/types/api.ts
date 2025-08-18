// src/shared/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  idUser: number;
  name: string;
  email: string;
  rol: string;
  token: string;
  loginTime: string;
  tokenExpiration: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  rol: 'Administrador' | 'Comprador';
}

export interface RegisterResponse {
  idUser: number;
  name: string;
  email: string;
  rol: string;
  dateCreated: string;
  message: string;
}

// Product Types
export interface Product {
  idProduct: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  creationDate: string;
  totalSuppliers: number;
  totalStock: number;
  minPrice: number;
  maxPrice: number;
  hasActiveSuppliers: boolean;
}

export interface ProductDetail {
  idProduct: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  creationDate: string;
  suppliers: ProductSupplierDetail[];
}

export interface ProductSupplierDetail {
  idSupplier: number;
  supplierName: string;
  supplierContact: string;
  supplierPhone: string;
  idLot: number;
  lotCode: string;
  lotExpDate: string;
  isLotExpired: boolean;
  price: number;
  stock: number;
  lastUpdated: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export interface ProductUpdate {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

// Supplier Types
export interface Supplier {
  idSupplier: number;
  name: string;
  contact: string;
  phone: string;
  totalProducts: number;
  isActive: boolean;
}

export interface SupplierDetail {
  idSupplier: number;
  name: string;
  contact: string;
  phone: string;
  address: string;
  products: SupplierProduct[];
  totalProducts: number;
}

export interface SupplierProduct {
  idProduct: number;
  productName: string;
  price: number;
  stock: number;
  lotCode: string;
  lotExpDate: string;
  isExpired: boolean;
}

export interface SupplierCreate {
  name: string;
  contact: string;
  phone: string;
  address: string;
}

export interface SupplierUpdate {
  name: string;
  contact: string;
  phone: string;
  address: string;
}

// Lot Types
export interface Lot {
  idLot: number;
  codeLote: string;
  dateOfAdmission: string;
  expDate: string;
  isExpired: boolean;
  daysUntilExpiration: number;
  expirationStatus: string;
  totalProducts: number;
}

export interface LotDetail {
  idLot: number;
  codeLote: string;
  dateOfAdmission: string;
  expDate: string;
  isExpired: boolean;
  daysUntilExpiration: number;
  expirationStatus: string;
  products: LotProduct[];
}

export interface LotProduct {
  idProduct: number;
  productName: string;
  supplierName: string;
  price: number;
  stock: number;
}

export interface LotCreate {
  codeLote: string;
  dateOfAdmission: string;
  expDate: string;
}

export interface LotUpdate {
  codeLote: string;
  dateOfAdmission: string;
  expDate: string;
}

// Product-Supplier Types
export interface ProductSupplierCreate {
  idProduct: number;
  idSupplier: number;
  idLot: number;
  price: number;
  stock: number;
}

export interface ProductSupplierUpdate {
  price: number;
  stock: number;
}