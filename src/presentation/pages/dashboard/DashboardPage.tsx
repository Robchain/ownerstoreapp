// src/presentation/pages/dashboard/DashboardPage.tsx
import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Badge } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux-hooks';
import { fetchProductsAsync, fetchSuppliersAsync, fetchLotsAsync } from '../../../infrastructure/store/slices/admin-slice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, suppliers, lots, isLoading, error } = useAppSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchSuppliersAsync());
    dispatch(fetchLotsAsync());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const totalLots = lots.length;
  const activeSuppliers = suppliers.filter(s => s.isActive).length;
  const expiredLots = lots.filter(l => l.isExpired).length;
  const expiringSoon = lots.filter(l => !l.isExpired && l.daysUntilExpiration <= 30).length;

  if (isLoading.products || isLoading.suppliers || isLoading.lots) {
    return <LoadingSpinner fullPage text="Cargando dashboard..." />;
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard Administrativo</h2>
        <Badge color="info">Panel de Control</Badge>
      </div>

      <ErrorAlert error={error} />

      {/* Estadísticas principales */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-primary">
            <CardBody className="text-center">
              <i className="bi bi-box display-4 text-primary"></i>
              <h3 className="mt-2">{totalProducts}</h3>
              <p className="text-muted mb-0">Productos</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-success">
            <CardBody className="text-center">
              <i className="bi bi-truck display-4 text-success"></i>
              <h3 className="mt-2">{activeSuppliers}/{totalSuppliers}</h3>
              <p className="text-muted mb-0">Proveedores Activos</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-info">
            <CardBody className="text-center">
              <i className="bi bi-archive display-4 text-info"></i>
              <h3 className="mt-2">{totalLots}</h3>
              <p className="text-muted mb-0">Lotes Totales</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-warning">
            <CardBody className="text-center">
              <i className="bi bi-exclamation-triangle display-4 text-warning"></i>
              <h3 className="mt-2">{expiredLots + expiringSoon}</h3>
              <p className="text-muted mb-0">Lotes por Vencer</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Productos recientes */}
        <Col md={6} className="mb-4">
          <Card>
            <CardHeader>
              <h5 className="mb-0">
                <i className="bi bi-box me-2"></i>
                Productos Recientes
              </h5>
            </CardHeader>
            <CardBody>
              {products.length === 0 ? (
                <p className="text-muted">No hay productos registrados</p>
              ) : (
                <div className="list-group list-group-flush">
                  {products.slice(0, 5).map(product => (
                    <div key={product.idProduct} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{product.name}</h6>
                          <small className="text-muted">{product.category}</small>
                        </div>
                        <div className="text-end">
                          <Badge color={product.hasActiveSuppliers ? 'success' : 'secondary'}>
                            {product.totalSuppliers} proveedores
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>

        {/* Lotes por vencer */}
        <Col md={6} className="mb-4">
          <Card>
            <CardHeader>
              <h5 className="mb-0">
                <i className="bi bi-clock me-2"></i>
                Lotes por Vencer
              </h5>
            </CardHeader>
            <CardBody>
              {lots.length === 0 ? (
                <p className="text-muted">No hay lotes registrados</p>
              ) : (
                <div className="list-group list-group-flush">
                  {lots
                    .filter(lot => lot.isExpired || lot.daysUntilExpiration <= 30)
                    .slice(0, 5)
                    .map(lot => (
                      <div key={lot.idLot} className="list-group-item border-0 px-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{lot.codeLote}</h6>
                            <small className="text-muted">
                              Vence: {new Date(lot.expDate).toLocaleDateString()}
                            </small>
                          </div>
                          <div>
                            <Badge color={
                              lot.isExpired ? 'danger' : 
                              lot.daysUntilExpiration <= 7 ? 'warning' : 'info'
                            }>
                              {lot.expirationStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;