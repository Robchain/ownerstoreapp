import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useAuth } from '../../../shared/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/admin/dashboard">
        <i className="bi bi-shop me-2"></i>
        OwnerStore Admin
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/admin/dashboard">
              <i className="bi bi-speedometer2 me-1"></i>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/products">
              <i className="bi bi-box me-1"></i>
              Productos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/suppliers">
              <i className="bi bi-truck me-1"></i>
              Proveedores
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/lots">
              <i className="bi bi-archive me-1"></i>
              Lotes
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <i className="bi bi-person-circle me-1"></i>
              {user?.name}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem header>
                {user?.email}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;