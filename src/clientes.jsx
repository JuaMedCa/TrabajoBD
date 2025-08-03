import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkStyle } from './Home';

export default function ClientesForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert('Cliente registrado: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error al registrar cliente');
    }
  };

  return (
<<<<<<< Updated upstream
    <form onSubmit={handleSubmit}>
      <h2>Registrar Cliente</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>
=======
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#f1f1f1' }}>Gestión de Clientes</h2>
        <Link to="/" className="btn btn-outline-light">
          🏠 Regresar al Home
        </Link>
      </div>
>>>>>>> Stashed changes

      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input name="correo" type="email" placeholder="Correo electrónico" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      <button type="submit">Guardar</button>
    </form>
  );
}
