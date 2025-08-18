// src/presentation/components/common/ErrorAlert.tsx
import React from 'react';
import { Alert, Button } from 'reactstrap';

interface ErrorAlertProps {
  error: string | null;
  onDismiss?: () => void;
  variant?: 'danger' | 'warning' | 'info';
  title?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  onDismiss, 
  variant = 'danger',
  title 
}) => {
  if (!error) return null;

  return (
    <Alert color={variant} className="mb-3">
      {title && <h6 className="alert-heading">{title}</h6>}
      <div>{error}</div>
      {onDismiss && (
        <Button 
          color="link" 
          className="p-0 mt-2" 
          onClick={onDismiss}
          style={{ textDecoration: 'none' }}
        >
          Cerrar
        </Button>
      )}
    </Alert>
  );
};

export default ErrorAlert;