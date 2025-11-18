import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo siento, la página que estás buscando no existe.</p>
        <Link to="/" className="home-link">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
