import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './infrastructure/store/store';

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import Header from './presentation/components/layout/Header';
import Footer from './presentation/components/layout/Footer';
import ProtectedRoute from './presentation/components/common/ProtectedRoute';

// Pages
import LoginPage from './presentation/pages/auth/LoginPage';
import DashboardPage from './presentation/pages/dashboard/DashboardPage';
import ProductManagementPage from './presentation/pages/admin/ProductManagementPage';
import SupplierManagementPage from './presentation/pages/admin/SupplierManagementPage';
import LotManagementPage from './presentation/pages/admin/LotManagementPage';
import NotFoundPage from './presentation/pages/common/NotFoundPage';

function App() {


  return (
    <Provider store={store}>
      <Router>
         <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
               {/* Ruta raíz - redirige al dashboard si está autenticado, sino al login */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              
              {/* Rutas de autenticación */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Rutas protegidas de administración */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="Administrador">
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/products" element={
                <ProtectedRoute requiredRole="Administrador">
                  <ProductManagementPage />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/suppliers" element={
                <ProtectedRoute requiredRole="Administrador">
                  <SupplierManagementPage />
                </ProtectedRoute>
              } />
              
            </Routes>
          </main>
         </div>
      </Router>
    </Provider>
  )
}

export default App
