import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux-hooks';
import {
  fetchSuppliersAsync,
  createSupplierAsync,
  updateSupplierAsync,
  deleteSupplierAsync,
  clearErrorA
} from '../../../infrastructure/store/slices/admin-slice';
import { SupplierCreate, SupplierUpdate } from '../../../shared/types/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const SupplierManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { suppliers, isLoading, error } = useAppSelector(state => state.admin);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<SupplierCreate>({
    name: '',
    contact: '',
    phone: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    dispatch(fetchSuppliersAsync());
  }, [dispatch]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (supplier?: any) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        phone: supplier.phone,
        address: supplier.address || ''
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        contact: '',
        phone: '',
        address: ''
      });
    }
    setFormErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: '',
      contact: '',
      phone: '',
      address: ''
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    if (!formData.contact.trim()) {
      errors.contact = 'El contacto es requerido';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    }
    if (!formData.address.trim()) {
      errors.address = 'La dirección es requerida';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingSupplier) {
        await dispatch(updateSupplierAsync({ 
          id: editingSupplier.idSupplier, 
          data: formData as SupplierUpdate 
        })).unwrap();
      } else {
        await dispatch(createSupplierAsync(formData)).unwrap();
      }
      handleCloseModal();
      dispatch(fetchSuppliersAsync());
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
    }
  };

  const handleDelete = async (supplierId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      try {
        await dispatch(deleteSupplierAsync(supplierId)).unwrap();
        dispatch(fetchSuppliersAsync());
      } catch (error) {
        console.error('Error al eliminar proveedor:', error);
      }
    }
  };

  const handleInputChange = (field: keyof SupplierCreate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="container-fluid py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Gestión de Proveedores</h2>
            <Button color="primary" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-lg me-1"></i>
              Nuevo Proveedor
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroupText>
              <i className="bi bi-search"></i>
            </InputGroupText>
            <Input
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <ErrorAlert 
        error={error} 
        onDismiss={() => dispatch(clearErrorA())} 
      />

      <Card>
        <CardHeader>
          <h5 className="mb-0">
            <i className="bi bi-truck me-2"></i>
            Lista de Proveedores ({filteredSuppliers.length})
          </h5>
        </CardHeader>
        <CardBody>
          {isLoading.suppliers ? (
            <LoadingSpinner text="Cargando proveedores..." />
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Teléfono</th>
                    <th>Productos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map(supplier => (
                    <tr key={supplier.idSupplier}>
                      <td>{supplier.idSupplier}</td>
                      <td>
                        <strong>{supplier.name}</strong>
                      </td>
                      <td>{supplier.contact}</td>
                      <td>
                        <a href={`tel:${supplier.phone}`} className="text-decoration-none">
                          <i className="bi bi-telephone me-1"></i>
                          {supplier.phone}
                        </a>
                      </td>
                      <td>
                        <Badge color="info">{supplier.totalProducts}</Badge>
                      </td>
                      <td>
                        <Badge color={supplier.isActive ? 'success' : 'secondary'}>
                          {supplier.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="warning"
                          className="me-1"
                          onClick={() => handleOpenModal(supplier)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(supplier.idSupplier)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              {filteredSuppliers.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No se encontraron proveedores</p>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal para crear/editar proveedor */}
      <Modal isOpen={modalOpen} toggle={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={handleCloseModal}>
            {editingSupplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nombre *</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    invalid={!!formErrors.name}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="contact">Contacto *</Label>
                  <Input
                    type="text"
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    invalid={!!formErrors.contact}
                  />
                  {formErrors.contact && (
                    <div className="invalid-feedback">{formErrors.contact}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="phone">Teléfono *</Label>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                invalid={!!formErrors.phone}
              />
              {formErrors.phone && (
                <div className="invalid-feedback">{formErrors.phone}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="address">Dirección *</Label>
              <Input
                type="textarea"
                id="address"
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                invalid={!!formErrors.address}
              />
              {formErrors.address && (
                <div className="invalid-feedback">{formErrors.address}</div>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {editingSupplier ? 'Actualizar' : 'Crear'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplierManagementPage;