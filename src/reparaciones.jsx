import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkStyle } from './Home';

export default function ReparacionesForm() {
  const [form, setForm] = useState({
    auto_id: '',
    descripcion: '',
    fecha: '',
    costo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/reparaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert('Reparación registrada: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error al registrar reparación');
    }
  };

  return (
<<<<<<< Updated upstream
    <form onSubmit={handleSubmit}>
      <h2>Registrar Reparación</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>
=======
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#f1f1f1' }}>Gestión de Reparaciones</h2>
        <Link to="/" className="btn btn-outline-light">
          🏠 Regresar al Home
        </Link>
      </div>
>>>>>>> Stashed changes

      <input
        name="auto_id"
        placeholder="ID del Auto"
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción de la reparación"
        onChange={handleChange}
        required
      />
      <label>Fecha:</label>
      <input
        name="fecha"
        type="date"
        onChange={handleChange}
        required
      />
      <input
        name="costo"
        type="number"
        placeholder="Costo"
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
