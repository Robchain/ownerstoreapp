// src/presentation/pages/admin/LotManagementPage.tsx
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
  fetchLotsAsync,
  createLotAsync,
  updateLotAsync,
  deleteLotAsync,
  clearErrorA
} from '../../../infrastructure/store/slices/admin-slice';
import { LotCreate, LotUpdate } from '../../../shared/types/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const LotManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lots, isLoading, error } = useAppSelector(state => state.admin);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLot, setEditingLot] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<LotCreate>({
    codeLote: '',
    dateOfAdmission: '',
    expDate: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    dispatch(fetchLotsAsync());
  }, [dispatch]);

  const filteredLots = lots.filter(lot =>
    lot.codeLote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (lot?: any) => {
    if (lot) {
      setEditingLot(lot);
      setFormData({
        codeLote: lot.codeLote,
        dateOfAdmission: new Date(lot.dateOfAdmission).toISOString().split('T')[0],
        expDate: new Date(lot.expDate).toISOString().split('T')[0]
      });
    } else {
      setEditingLot(null);
      setFormData({
        codeLote: '',
        dateOfAdmission: '',
        expDate: ''
      });
    }
    setFormErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingLot(null);
    setFormData({
      codeLote: '',
      dateOfAdmission: '',
      expDate: ''
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!formData.codeLote.trim()) {
      errors.codeLote = 'El código de lote es requerido';
    }
    if (!formData.dateOfAdmission) {
      errors.dateOfAdmission = 'La fecha de admisión es requerida';
    }
    if (!formData.expDate) {
      errors.expDate = 'La fecha de vencimiento es requerida';
    }
    
    if (formData.dateOfAdmission && formData.expDate) {
      const admissionDate = new Date(formData.dateOfAdmission);
      const expDate = new Date(formData.expDate);
      
      if (expDate <= admissionDate) {
        errors.expDate = 'La fecha de vencimiento debe ser posterior a la fecha de admisión';
      }
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
      const formattedData = {
        ...formData,
        dateOfAdmission: new Date(formData.dateOfAdmission).toISOString(),
        expDate: new Date(formData.expDate).toISOString()
      };

      if (editingLot) {
        await dispatch(updateLotAsync({ 
          id: editingLot.idLot, 
          data: formattedData as LotUpdate 
        })).unwrap();
      } else {
        await dispatch(createLotAsync(formattedData)).unwrap();
      }
      handleCloseModal();
      dispatch(fetchLotsAsync());
    } catch (error) {
      console.error('Error al guardar lote:', error);
    }
  };

  const handleDelete = async (lotId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este lote?')) {
      try {
        await dispatch(deleteLotAsync(lotId)).unwrap();
        dispatch(fetchLotsAsync());
      } catch (error) {
        console.error('Error al eliminar lote:', error);
      }
    }
  };

  const handleInputChange = (field: keyof LotCreate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const getStatusColor = (lot: any) => {
    if (lot.isExpired) return 'danger';
    if (lot.daysUntilExpiration <= 7) return 'warning';
    if (lot.daysUntilExpiration <= 30) return 'info';
    return 'success';
  };

  return (
    <div className="container-fluid py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Gestión de Lotes</h2>
            <Button color="primary" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-lg me-1"></i>
              Nuevo Lote
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
              placeholder="Buscar lotes..."
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
            <i className="bi bi-archive me-2"></i>
            Lista de Lotes ({filteredLots.length})
          </h5>
        </CardHeader>
        <CardBody>
          {isLoading.lots ? (
            <LoadingSpinner text="Cargando lotes..." />
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Fecha Admisión</th>
                    <th>Fecha Vencimiento</th>
                    <th>Días Restantes</th>
                    <th>Estado</th>
                    <th>Productos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLots.map(lot => (
                    <tr key={lot.idLot}>
                      <td>{lot.idLot}</td>
                      <td>
                        <strong>{lot.codeLote}</strong>
                      </td>
                      <td>
                        {new Date(lot.dateOfAdmission).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(lot.expDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Badge color={lot.isExpired ? 'danger' : 'info'}>
                          {lot.isExpired ? 'Vencido' : `${lot.daysUntilExpiration} días`}
                        </Badge>
                      </td>
                      <td>
                        <Badge color={getStatusColor(lot)}>
                          {lot.expirationStatus}
                        </Badge>
                      </td>
                      <td>
                        <Badge color="secondary">{lot.totalProducts}</Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="warning"
                          className="me-1"
                          onClick={() => handleOpenModal(lot)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(lot.idLot)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              {filteredLots.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No se encontraron lotes</p>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal para crear/editar lote */}
      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={handleCloseModal}>
            {editingLot ? 'Editar Lote' : 'Nuevo Lote'}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="codeLote">Código de Lote *</Label>
              <Input
                type="text"
                id="codeLote"
                value={formData.codeLote}
                onChange={(e) => handleInputChange('codeLote', e.target.value)}
                invalid={!!formErrors.codeLote}
                placeholder="Ej: LOT-2025-001"
              />
              {formErrors.codeLote && (
                <div className="invalid-feedback">{formErrors.codeLote}</div>
              )}
            </FormGroup>
            
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="dateOfAdmission">Fecha de Admisión *</Label>
                  <Input
                    type="date"
                    id="dateOfAdmission"
                    value={formData.dateOfAdmission}
                    onChange={(e) => handleInputChange('dateOfAdmission', e.target.value)}
                    invalid={!!formErrors.dateOfAdmission}
                  />
                  {formErrors.dateOfAdmission && (
                    <div className="invalid-feedback">{formErrors.dateOfAdmission}</div>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="expDate">Fecha de Vencimiento *</Label>
                  <Input
                    type="date"
                    id="expDate"
                    value={formData.expDate}
                    onChange={(e) => handleInputChange('expDate', e.target.value)}
                    invalid={!!formErrors.expDate}
                  />
                  {formErrors.expDate && (
                    <div className="invalid-feedback">{formErrors.expDate}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {editingLot ? 'Actualizar' : 'Crear'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default LotManagementPage;