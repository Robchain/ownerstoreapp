import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-light border-end" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
      <div className="p-3">
        <h6 className="text-muted mb-3">ADMINISTRACIÓN</h6>
        <Nav vertical>
          <NavItem>
            <NavLink 
              href="/admin/dashboard" 
              active={isActive('/admin/dashboard')}
              className="d-flex align-items-center"
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              href="/admin/products" 
              active={isActive('/admin/products')}
              className="d-flex align-items-center"
            >
              <i className="bi bi-box me-2"></i>
              Productos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              href="/admin/suppliers" 
              active={isActive('/admin/suppliers')}
              className="d-flex align-items-center"
            >
              <i className="bi bi-truck me-2"></i>
              Proveedores
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              href="/admin/lots" 
              active={isActive('/admin/lots')}
              className="d-flex align-items-center"
            >
              <i className="bi bi-archive me-2"></i>
              Lotes
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;