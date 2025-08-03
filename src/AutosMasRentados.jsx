import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AutosMasRentados() {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/rentas/mas-rentados')
      .then(res => res.json())
      .then(data => setAutos(data))
      .catch(err => {
        console.error(err);
        alert('Error al obtener los autos más rentados');
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#f1f1f1' }}>Autos más Rentados (últimos 2 meses)</h2>
        <Link to="/" className="btn btn-outline-dark" style={{ color: '#f1f1f1' }}>🏠 Regresar al Home</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-info">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Veces Rentado</th>
              </tr>
            </thead>
            <tbody>
              {autos.map((auto, i) => (
                <tr key={i}>
                  <td>{auto.marca}</td>
                  <td>{auto.modelo}</td>
                  <td>{auto.total_rentas}</td>
                </tr>
              ))}
              {autos.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">No hay datos de rentas recientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
