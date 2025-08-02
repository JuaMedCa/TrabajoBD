import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AutosForm() {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    año: '',
    placas: '',
    disponible: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/autos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert('Auto registrado: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error al registrar auto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Auto</h2>
      <Link to="/" style={linkStyle}>🏠 Regresar al Home</Link>

      <input
        name="marca"
        placeholder="Marca"
        onChange={handleChange}
        required
      />

      <input
        name="modelo"
        placeholder="Modelo"
        onChange={handleChange}
        required
      />

      <input
        name="año"
        type="number"
        placeholder="Año"
        onChange={handleChange}
        required
      />

      <input
        name="placas"
        placeholder="Placas"
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />
        Disponible
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
}

const linkStyle = {
  display: 'inline-block',
  marginBottom: '20px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold'
};
