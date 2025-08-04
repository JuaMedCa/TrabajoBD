// ✅ AutosForm.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AutosForm() {
  const [autos, setAutos] = useState([]);
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    año: '',
    placas: '',
    disponible: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    try {
      const res = await fetch('http://localhost:4000/autos');
      const data = await res.json();
      setAutos(data);
    } catch (err) {
      console.error('Error al cargar autos', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `http://localhost:4000/autos/${editingId}` : 'http://localhost:4000/autos';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Error en la petición');

      setForm({ marca: '', modelo: '', año: '', placas: '', disponible: true });
      setEditingId(null);
      fetchAutos();
      alert(editingId ? 'Auto actualizado' : 'Auto registrado');
    } catch (err) {
      console.error(err);
      alert('Error al guardar auto');
    }
  };

  const handleEdit = (auto) => {
    setForm({
      marca: auto.marca,
      modelo: auto.modelo,
      año: auto.año,
      placas: auto.placas,
      disponible: auto.disponible
    });
    setEditingId(auto._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este auto?')) return;
    try {
      await fetch(`http://localhost:4000/autos/${id}`, { method: 'DELETE' });
      fetchAutos();
    } catch (err) {
      alert('Error al eliminar auto');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'white' }}>Gestión de Autos</h2>
        <Link to="/" className="btn btn-outline-light">🏠 Regresar al Home</Link>
      </div>

      <div >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'black' }}>Marca</label>
                <input name="marca" value={form.marca} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'black' }}>Modelo</label>
                <input name="modelo" value={form.modelo} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'black' }}>Año</label>
                <input name="año" value={form.año} onChange={handleChange} type="number" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'black' }}>Placas</label>
                <input name="placas" value={form.placas} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} />
                  <label className="form-check-label" style={{ color: 'black' }}>Disponible</label>
                </div>
              </div>
            </div>
            <div className="mt-4 text-end">
              <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-success'}`}>
                {editingId ? 'Actualizar Auto' : 'Guardar Auto'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Placas</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {autos.map(auto => (
                <tr key={auto._id}>
                  <td>{auto.marca}</td>
                  <td>{auto.modelo}</td>
                  <td>{auto.año}</td>
                  <td>{auto.placas}</td>
                  <td>{auto.disponible ? 'Sí' : 'No'}</td>
                  <td>
                    <button onClick={() => handleEdit(auto)} className="btn btn-sm btn-outline-info me-2">Editar</button>
                    <button onClick={() => handleDelete(auto._id)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
              {autos.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No hay autos registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
