import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { linkStyle } from './Home';

export default function ListaAutosDisponibles() {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/autos/disponibles')
      .then(res => res.json())
      .then(data => setAutos(data))
      .catch(err => {
        console.error('Error al cargar autos disponibles:', err);
        alert('Error al cargar autos disponibles');
      });
  }, []);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '30px auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2>Autos Disponibles</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Marca</th>
            <th style={thStyle}>Modelo</th>
            <th style={thStyle}>Año</th>
            <th style={thStyle}>Placas</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto._id}>
              <td style={tdStyle}>{auto.marca}</td>
              <td style={tdStyle}>{auto.modelo}</td>
              <td style={tdStyle}>{auto.año}</td>
              <td style={tdStyle}>{auto.placas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  textAlign: 'left',
  borderBottom: '2px solid #ccc'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};
