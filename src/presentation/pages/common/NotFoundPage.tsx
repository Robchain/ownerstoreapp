import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <Card className="text-center" style={{ maxWidth: '500px' }}>
        <CardBody className="p-5">
          <div className="mb-4">
            <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
          </div>
          <h1 className="display-4 mb-3">404</h1>
          <h4 className="mb-3">Página no encontrada</h4>
          <p className="text-muted mb-4">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button 
              color="primary" 
              onClick={() => navigate('/admin/dashboard')}
              className="me-md-2"
            >
              <i className="bi bi-house me-1"></i>
              Ir al Dashboard
            </Button>
            <Button 
              color="outline-secondary" 
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Volver
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFoundPage;