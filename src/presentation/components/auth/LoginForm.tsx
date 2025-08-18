import React, { useState, useEffect } from 'react';
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert, 
  Card, 
  CardBody, 
  CardHeader,
  Spinner
} from 'reactstrap';
import { useAuth } from '../../../shared/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated, clearAuthError, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {

    return () => {
      if (error) {
        clearAuthError();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    const success = await login({ email, password });
    
    if (success) {

      console.log('Login exitoso');
    }
  };

  const handleInputChange = () => {
    if (error) {
      clearAuthError();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card style={{ width: '400px' }}>
        <CardHeader className="text-center bg-primary text-white">
          <h4 className="mb-0">Iniciar Sesión - Admin</h4>
        </CardHeader>
        <CardBody>
          {error && (
            <Alert color="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange();
                }}
                required
                disabled={isLoading}
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChange();
                }}
                required
                disabled={isLoading}
              />
            </FormGroup>
            
            <Button 
              type="submit" 
              color="primary" 
              block 
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </Form>
          
          <div className="mt-3 text-center">
            <small className="text-muted">
              Demo - Usa credenciales de administrador
            </small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;