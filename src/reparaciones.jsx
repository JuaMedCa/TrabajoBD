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
    <form onSubmit={handleSubmit}>
      <h2>Registrar Reparación</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>

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
