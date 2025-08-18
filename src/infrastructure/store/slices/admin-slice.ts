// src/infrastructure/store/slices/admin-slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminService } from '../../services/api/admin-service';
import { 
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

interface AdminState {
  // Products
  products: Product[];
  selectedProduct: ProductDetail | null;
  
  // Suppliers
  suppliers: Supplier[];
  selectedSupplier: SupplierDetail | null;
  
  // Lots
  lots: Lot[];
  selectedLot: LotDetail | null;
  
  // Product Suppliers
  productSuppliers: ProductSupplierDetail[];
  
  // Loading states
  isLoading: {
    products: boolean;
    suppliers: boolean;
    lots: boolean;
    productSuppliers: boolean;
  };
  
  // Error state
  error: string | null;
}

const initialState: AdminState = {
  products: [],
  selectedProduct: null,
  suppliers: [],
  selectedSupplier: null,
  lots: [],
  selectedLot: null,
  productSuppliers: [],
  isLoading: {
    products: false,
    suppliers: false,
    lots: false,
    productSuppliers: false,
  },
  error: null,
};

// ============== PRODUCT ASYNC THUNKS ==============
export const fetchProductsAsync = createAsyncThunk(
  'admin/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getProducts();
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener productos');
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const fetchProductAsync = createAsyncThunk(
  'admin/fetchProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await adminService.getProduct(productId);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener producto');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const createProductAsync = createAsyncThunk(
  'admin/createProduct',
  async (productData: ProductCreate, { rejectWithValue }) => {
    try {
      const response = await adminService.createProduct(productData);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear producto');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, data }: { id: number; data: ProductUpdate }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateProduct(id, data);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al actualizar producto');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'admin/deleteProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteProduct(productId);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al eliminar producto');
      }
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

// ============== SUPPLIER ASYNC THUNKS ==============
export const fetchSuppliersAsync = createAsyncThunk(
  'admin/fetchSuppliers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getSuppliers();
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener proveedores');
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const createSupplierAsync = createAsyncThunk(
  'admin/createSupplier',
  async (supplierData: SupplierCreate, { rejectWithValue }) => {
    try {
      const response = await adminService.createSupplier(supplierData);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear proveedor');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const updateSupplierAsync = createAsyncThunk(
  'admin/updateSupplier',
  async ({ id, data }: { id: number; data: SupplierUpdate }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateSupplier(id, data);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al actualizar proveedor');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const deleteSupplierAsync = createAsyncThunk(
  'admin/deleteSupplier',
  async (supplierId: number, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteSupplier(supplierId);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al eliminar proveedor');
      }
      return supplierId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

// ============== LOT ASYNC THUNKS ==============
export const fetchLotsAsync = createAsyncThunk(
  'admin/fetchLots',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getLots();
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener lotes');
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const createLotAsync = createAsyncThunk(
  'admin/createLot',
  async (lotData: LotCreate, { rejectWithValue }) => {
    try {
      const response = await adminService.createLot(lotData);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear lote');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const updateLotAsync = createAsyncThunk(
  'admin/updateLot',
  async ({ id, data }: { id: number; data: LotUpdate }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateLot(id, data);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al actualizar lote');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const deleteLotAsync = createAsyncThunk(
  'admin/deleteLot',
  async (lotId: number, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteLot(lotId);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al eliminar lote');
      }
      return lotId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

// ============== PRODUCT SUPPLIER ASYNC THUNKS ==============
export const fetchProductSuppliersAsync = createAsyncThunk(
  'admin/fetchProductSuppliers',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await adminService.getProductSuppliers(productId);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener proveedores del producto');
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

export const assignSupplierToProductAsync = createAsyncThunk(
  'admin/assignSupplierToProduct',
  async (data: ProductSupplierCreate, { rejectWithValue }) => {
    try {
      const response = await adminService.assignSupplierToProduct(data);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al asignar proveedor');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de conexión');
    }
  }
);

// ============== ADMIN SLICE ==============
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearErrorA: (state) => {
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductDetail | null>) => {
      state.selectedProduct = action.payload;
    },
    setSelectedSupplier: (state, action: PayloadAction<SupplierDetail | null>) => {
      state.selectedSupplier = action.payload;
    },
    setSelectedLot: (state, action: PayloadAction<LotDetail | null>) => {
      state.selectedLot = action.payload;
    },
    clearSelections: (state) => {
      state.selectedProduct = null;
      state.selectedSupplier = null;
      state.selectedLot = null;
      state.productSuppliers = [];
    },
  },
  extraReducers: (builder) => {
    // ============== PRODUCTS ==============
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading.products = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading.products = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading.products = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload || null;
      })
      
      .addCase(createProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          // Convertir ProductDetail a Product para la lista
          const newProduct: Product = {
            idProduct: action.payload.idProduct,
            name: action.payload.name,
            description: action.payload.description,
            category: action.payload.category,
            imageUrl: action.payload.imageUrl,
            creationDate: action.payload.creationDate,
            totalSuppliers: 0,
            totalStock: 0,
            minPrice: 0,
            maxPrice: 0,
            hasActiveSuppliers: false
          };
          state.products.push(newProduct);
        }
      })
      
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.products.findIndex(p => p.idProduct === action.payload!.idProduct);
          if (index !== -1) {
            // Actualizar en la lista manteniendo los campos adicionales
            state.products[index] = {
              ...state.products[index],
              name: action.payload.name,
              description: action.payload.description,
              category: action.payload.category,
              imageUrl: action.payload.imageUrl,
            };
          }
          state.selectedProduct = action.payload;
        }
      })
      
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.idProduct !== action.payload);
        if (state.selectedProduct?.idProduct === action.payload) {
          state.selectedProduct = null;
        }
      });

    // ============== SUPPLIERS ==============
    builder
      .addCase(fetchSuppliersAsync.pending, (state) => {
        state.isLoading.suppliers = true;
        state.error = null;
      })
      .addCase(fetchSuppliersAsync.fulfilled, (state, action) => {
        state.isLoading.suppliers = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliersAsync.rejected, (state, action) => {
        state.isLoading.suppliers = false;
        state.error = action.payload as string;
      })
      
      .addCase(createSupplierAsync.fulfilled, (state, action) => {
        if (action.payload) {
          // Convertir SupplierDetail a Supplier para la lista
          const newSupplier: Supplier = {
            idSupplier: action.payload.idSupplier,
            name: action.payload.name,
            contact: action.payload.contact,
            phone: action.payload.phone,
            totalProducts: 0,
            isActive: false
          };
          state.suppliers.push(newSupplier);
        }
      })
      
      .addCase(deleteSupplierAsync.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.filter(s => s.idSupplier !== action.payload);
        if (state.selectedSupplier?.idSupplier === action.payload) {
          state.selectedSupplier = null;
        }
      });

    // ============== LOTS ==============
    builder
      .addCase(fetchLotsAsync.pending, (state) => {
        state.isLoading.lots = true;
        state.error = null;
      })
      .addCase(fetchLotsAsync.fulfilled, (state, action) => {
        state.isLoading.lots = false;
        state.lots = action.payload;
      })
      .addCase(fetchLotsAsync.rejected, (state, action) => {
        state.isLoading.lots = false;
        state.error = action.payload as string;
      })
      
      .addCase(createLotAsync.fulfilled, (state, action) => {
        if (action.payload) {
          // Convertir LotDetail a Lot para la lista
          const newLot: Lot = {
            idLot: action.payload.idLot,
            codeLote: action.payload.codeLote,
            dateOfAdmission: action.payload.dateOfAdmission,
            expDate: action.payload.expDate,
            isExpired: action.payload.isExpired,
            daysUntilExpiration: action.payload.daysUntilExpiration,
            expirationStatus: action.payload.expirationStatus,
            totalProducts: 0
          };
          state.lots.push(newLot);
        }
      })
      
      .addCase(deleteLotAsync.fulfilled, (state, action) => {
        state.lots = state.lots.filter(l => l.idLot !== action.payload);
        if (state.selectedLot?.idLot === action.payload) {
          state.selectedLot = null;
        }
      });

    // ============== PRODUCT SUPPLIERS ==============
    builder
      .addCase(fetchProductSuppliersAsync.pending, (state) => {
        state.isLoading.productSuppliers = true;
        state.error = null;
      })
      .addCase(fetchProductSuppliersAsync.fulfilled, (state, action) => {
        state.isLoading.productSuppliers = false;
        state.productSuppliers = action.payload;
      })
      .addCase(fetchProductSuppliersAsync.rejected, (state, action) => {
        state.isLoading.productSuppliers = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearErrorA, 
  setSelectedProduct, 
  setSelectedSupplier, 
  setSelectedLot, 
  clearSelections 
} = adminSlice.actions;

export default adminSlice.reducer;