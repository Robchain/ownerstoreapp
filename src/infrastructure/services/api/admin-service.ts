import { httpClient } from './http-client';
import {
  ApiResponse,
  Product,
  ProductDetail,
  ProductCreate,
  ProductUpdate,
  Supplier,
  SupplierDetail,
  SupplierCreate,
  SupplierUpdate,
  Lot,
  LotDetail,
  LotCreate,
  LotUpdate,
  ProductSupplierCreate,
  ProductSupplierUpdate,
  ProductSupplierDetail
} from '../../../shared/types/api';

export class AdminService {
  // ============== PRODUCTS ==============
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return await httpClient.get<Product[]>('/admin/products');
  }

  async getProduct(id: number): Promise<ApiResponse<ProductDetail>> {
    return await httpClient.get<ProductDetail>(`/admin/products/${id}`);
  }

  async createProduct(product: ProductCreate): Promise<ApiResponse<ProductDetail>> {
    return await httpClient.post<ProductDetail>('/admin/products', product);
  }

  async updateProduct(id: number, product: ProductUpdate): Promise<ApiResponse<ProductDetail>> {
    return await httpClient.put<ProductDetail>(`/admin/products/${id}`, product);
  }

  async deleteProduct(id: number): Promise<ApiResponse<boolean>> {
    return await httpClient.delete<boolean>(`/admin/products/${id}`);
  }

  // ============== SUPPLIERS ==============
  async getSuppliers(): Promise<ApiResponse<Supplier[]>> {
    return await httpClient.get<Supplier[]>('/admin/suppliers');
  }

  async getSupplier(id: number): Promise<ApiResponse<SupplierDetail>> {
    return await httpClient.get<SupplierDetail>(`/admin/suppliers/${id}`);
  }

  async createSupplier(supplier: SupplierCreate): Promise<ApiResponse<SupplierDetail>> {
    return await httpClient.post<SupplierDetail>('/admin/suppliers', supplier);
  }

  async updateSupplier(id: number, supplier: SupplierUpdate): Promise<ApiResponse<SupplierDetail>> {
    return await httpClient.put<SupplierDetail>(`/admin/suppliers/${id}`, supplier);
  }

  async deleteSupplier(id: number): Promise<ApiResponse<boolean>> {
    return await httpClient.delete<boolean>(`/admin/suppliers/${id}`);
  }

  // ============== LOTS ==============
  async getLots(): Promise<ApiResponse<Lot[]>> {
    return await httpClient.get<Lot[]>('/admin/lots');
  }

  async getLot(id: number): Promise<ApiResponse<LotDetail>> {
    return await httpClient.get<LotDetail>(`/admin/lots/${id}`);
  }

  async createLot(lot: LotCreate): Promise<ApiResponse<LotDetail>> {
    return await httpClient.post<LotDetail>('/admin/lots', lot);
  }

  async updateLot(id: number, lot: LotUpdate): Promise<ApiResponse<LotDetail>> {
    return await httpClient.put<LotDetail>(`/admin/lots/${id}`, lot);
  }

  async deleteLot(id: number): Promise<ApiResponse<boolean>> {
    return await httpClient.delete<boolean>(`/admin/lots/${id}`);
  }

  // ============== PRODUCT-SUPPLIERS ==============
  async getProductSuppliers(productId: number): Promise<ApiResponse<ProductSupplierDetail[]>> {
    return await httpClient.get<ProductSupplierDetail[]>(`/admin/productsuppliers/product/${productId}`);
  }

  async assignSupplierToProduct(data: ProductSupplierCreate): Promise<ApiResponse<boolean>> {
    return await httpClient.post<boolean>('/admin/productsuppliers', data);
  }

  async updateProductSupplier(
    productId: number, 
    supplierId: number, 
    data: ProductSupplierUpdate
  ): Promise<ApiResponse<boolean>> {
    return await httpClient.put<boolean>(`/admin/productsuppliers/${productId}/${supplierId}`, data);
  }

  async removeSupplierFromProduct(productId: number, supplierId: number): Promise<ApiResponse<boolean>> {
    return await httpClient.delete<boolean>(`/admin/productsuppliers/${productId}/${supplierId}`);
  }
}

export const adminService = new AdminService();