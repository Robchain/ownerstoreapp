// src/presentation/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/use-auth';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Administrador' | 'Comprador';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'Administrador' 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingSpinner fullPage text="Verificando autenticación..." />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado pero no tiene el rol requerido
  if (user && user.rol !== requiredRole) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos para acceder a esta sección.</p>
          <p>Rol requerido: {requiredRole}</p>
          <p>Tu rol: {user.rol}</p>
        </div>
      </div>
    );
  }

  // Si todo está bien, mostrar el contenido
  return <>{children}</>;
};

export default ProtectedRoute;