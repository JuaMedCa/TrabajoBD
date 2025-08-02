import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkStyle } from './Home';

export default function RentasForm() {
  const [form, setForm] = useState({
    cliente_id: '',
    auto_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    costo_total: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/rentas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert('Renta registrada: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error al registrar renta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Renta</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>

      <input
        name="cliente_id"
        placeholder="ID del Cliente"
        onChange={handleChange}
        required
      />
      <input
        name="auto_id"
        placeholder="ID del Auto"
        onChange={handleChange}
        required
      />
      <label>Fecha Inicio:</label>
      <input
        name="fecha_inicio"
        type="date"
        onChange={handleChange}
        required
      />
      <label>Fecha Fin:</label>
      <input
        name="fecha_fin"
        type="date"
        onChange={handleChange}
        required
      />
      <input
        name="costo_total"
        type="number"
        placeholder="Costo Total"
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
