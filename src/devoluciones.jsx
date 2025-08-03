import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ✅ Estilo local para el botón de regresar al Home
const linkStyle = {
  display: 'inline-block',
  marginBottom: '10px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default function DevolucionesForm() {
  const [form, setForm] = useState({
    renta_id: '',
    fecha: '',
    estado_auto: '',
    comentarios: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/devoluciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert('Devolución registrada: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error al registrar devolución');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Devolución</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>

      <input
        name="renta_id"
        placeholder="ID de la Renta"
        onChange={handleChange}
        required
      />
      <label>Fecha de Devolución:</label>
      <input
        name="fecha"
        type="date"
        onChange={handleChange}
        required
      />
      <input
        name="estado_auto"
        placeholder="Estado del auto"
        onChange={handleChange}
        required
      />
      <textarea
        name="comentarios"
        placeholder="Comentarios (opcional)"
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
