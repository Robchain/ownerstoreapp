// src/presentation/pages/admin/ProductManagementPage.tsx
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
  Alert,
  Row,
  Col,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux-hooks';
import {
  fetchProductsAsync,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
  clearErrorA
} from '../../../infrastructure/store/slices/admin-slice';
import { ProductCreate, ProductUpdate } from '../../../shared/types/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const ProductManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.admin);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ProductCreate>({
    name: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        imageUrl: ''
      });
    }
    setFormErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      imageUrl: ''
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida';
    }
    if (!formData.category.trim()) {
      errors.category = 'La categoría es requerida';
    }
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'La URL de imagen es requerida';
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
      if (editingProduct) {
        await dispatch(updateProductAsync({ 
          id: editingProduct.idProduct, 
          data: formData as ProductUpdate 
        })).unwrap();
      } else {
        await dispatch(createProductAsync(formData)).unwrap();
      }
      handleCloseModal();
      dispatch(fetchProductsAsync());
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await dispatch(deleteProductAsync(productId)).unwrap();
        dispatch(fetchProductsAsync());
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const handleInputChange = (field: keyof ProductCreate, value: string) => {
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
            <h2>Gestión de Productos</h2>
            <Button color="primary" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-lg me-1"></i>
              Nuevo Producto
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
              placeholder="Buscar productos..."
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
            <i className="bi bi-box me-2"></i>
            Lista de Productos ({filteredProducts.length})
          </h5>
        </CardHeader>
        <CardBody>
          {isLoading.products ? (
            <LoadingSpinner text="Cargando productos..." />
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Proveedores</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.idProduct}>
                      <td>{product.idProduct}</td>
                      <td>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{product.name}</strong>
                          <br />
                          <small className="text-muted">{product.description}</small>
                        </div>
                      </td>
                      <td>
                        <Badge color="info">{product.category}</Badge>
                      </td>
                      <td>{product.totalSuppliers}</td>
                      <td>{product.totalStock}</td>
                      <td>
                        {product.minPrice === product.maxPrice 
                          ? `$${product.minPrice}`
                          : `$${product.minPrice} - $${product.maxPrice}`
                        }
                      </td>
                      <td>
                        <Badge color={product.hasActiveSuppliers ? 'success' : 'danger'}>
                          {product.hasActiveSuppliers ? 'Disponible' : 'Sin Stock'}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="warning"
                          className="me-1"
                          onClick={() => handleOpenModal(product)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(product.idProduct)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No se encontraron productos</p>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal para crear/editar producto */}
      <Modal isOpen={modalOpen} toggle={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={handleCloseModal}>
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
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
                  <Label for="category">Categoría *</Label>
                  <Input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    invalid={!!formErrors.category}
                  />
                  {formErrors.category && (
                    <div className="invalid-feedback">{formErrors.category}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="description">Descripción *</Label>
              <Input
                type="textarea"
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                invalid={!!formErrors.description}
              />
              {formErrors.description && (
                <div className="invalid-feedback">{formErrors.description}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="imageUrl">URL de Imagen *</Label>
              <Input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                invalid={!!formErrors.imageUrl}
              />
              {formErrors.imageUrl && (
                <div className="invalid-feedback">{formErrors.imageUrl}</div>
              )}
              {formData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '150px' }}
                    className="img-thumbnail"
                  />
                </div>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {editingProduct ? 'Actualizar' : 'Crear'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;