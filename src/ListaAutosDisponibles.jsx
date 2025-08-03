import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListaAutosDisponibles() {
  const [autos, setAutos] = useState([]);

useEffect(() => {
  fetch('http://localhost:4000/autos/disponibles')
    .then(res => res.json())
    .then(data => setAutos(data))
    .catch(err => console.error('Error al cargar autos disponibles:', err));
}, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#f1f1f1' }}>Autos Disponibles</h2>
        <Link to="/" className="btn btn-outline-dark" style={{ color: '#f1f1f1' }}>🏠 Regresar al Home</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-primary">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Placas</th>
              </tr>
            </thead>
            <tbody>
              {autos.map(auto => (
                <tr key={auto._id}>
                  <td>{auto.marca}</td>
                  <td>{auto.modelo}</td>
                  <td>{auto.año}</td>
                  <td>{auto.placas}</td>
                </tr>
              ))}
              {autos.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No hay autos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
