// Home.jsx - Menú principal
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Renta de Autos - Menú Principal</h1>
      <nav>
        <ul>
          <li><Link to="/autos">Registrar Autos</Link></li>
          <li><Link to="/clientes">Registrar Clientes</Link></li>
          <li><Link to="/rentas">Registrar Renta</Link></li>
          <li><Link to="/reparaciones">Registrar Reparaciones</Link></li>
          <li><Link to="/devoluciones">Registrar Devolución</Link></li>
          <li><Link to="/autos-disponibles">Ver Autos Disponibles</Link></li>
        </ul>
      </nav>
    </div>
  );
}

// Estilo para los botones de regreso
export const linkStyle = {
  display: 'inline-block',
  marginBottom: '20px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

// Agregar en cada componente:
// import { Link } from 'react-router-dom';
// import { linkStyle } from './Home';
// ...
// <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>