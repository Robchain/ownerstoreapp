import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <h1>Error</h1>
        <p>Ha ocurrido un error inesperado</p>
      </div>
    </div>
  );
};

export default ErrorPage;