import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-3 mt-auto border-top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted">© 2025 OwnerStore Admin. Todos los derechos reservados.</span>
          </div>
          <div className="col-md-6 text-end">
            <span className="text-muted">Versión 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;