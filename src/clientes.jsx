// src/Clientes.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', telefono: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await fetch('http://localhost:4000/clientes');
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error('Error al cargar clientes', err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = editingId ? `http://localhost:4000/clientes/${editingId}` : 'http://localhost:4000/clientes';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error en la respuesta del servidor');
      const updated = await res.json();
      if (editingId) {
        setClientes(prev =>
          prev.map(c => (c._id === updated._id ? updated : c))
        );
      } else {
        setClientes(prev => [...prev, updated]);
      }
      setForm({ nombre: '', apellido: '', correo: '', telefono: '' });
      setEditingId(null);
      alert(editingId ? 'Cliente actualizado' : 'Cliente registrado');
    } catch (error) {
      alert('Error al guardar cliente');
    }
  };

  const handleEdit = cliente => {
    setForm({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      telefono: cliente.telefono
    });
    setEditingId(cliente._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    try {
      const res = await fetch(`http://localhost:4000/clientes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setClientes(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      alert('Error al eliminar cliente');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestión de Clientes</h2>
        <Link to="/" className="btn btn-outline-light">
          🏠 Regresar al Home
        </Link>
      </div>

      {/* Formulario de alta/edición */}
      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Apellido"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Correo electrónico</label>
                <input
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Correo"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Numero"
                  required
                />
              </div>
            </div>
            <div className="mt-4 text-end">
              <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-success'}`}>
                {editingId ? 'Actualizar Cliente' : 'Guardar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c._id}>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.correo}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <button onClick={() => handleEdit(c)} className="btn btn-sm btn-outline-info me-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-outline-danger">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}