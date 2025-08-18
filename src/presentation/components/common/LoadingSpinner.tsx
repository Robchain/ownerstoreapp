// src/presentation/components/common/LoadingSpinner.tsx
import React from 'react';
import { Spinner } from 'reactstrap';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'Cargando...',
  fullPage = false 
}) => {
  const spinnerSize = size === 'md' ? undefined : size;
  
  if (fullPage) {
    return (
      <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100" 
           style={{ top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
        <div className="text-center">
          <Spinner size={spinnerSize} color={color} />
          {text && <div className="mt-2">{text}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="text-center">
        <Spinner size={spinnerSize} color={color} />
        {text && <div className="mt-2">{text}</div>}
      </div>
    </div>
  );
};

export default LoadingSpinner;