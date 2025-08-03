import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkStyle } from './Home';

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
<<<<<<< Updated upstream
    <form onSubmit={handleSubmit}>
      <h2>Registrar Devolución</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>
=======
    <div className="container mt-4">
      <h2 className="fw-bold" style={{ color: '#f1f1f1' }}>Registrar Devolución</h2>
      <Link to="/" className="btn btn-outline-primary mb-3">🏠 Regresar al Home</Link>
>>>>>>> Stashed changes

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
