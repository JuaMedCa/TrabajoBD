import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [autos, setAutos] = useState([]);
  const [form, setForm] = useState({
    auto_id: '',
    fecha: '',
    descripcion: '',
    costo: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReparaciones();
    fetchAutos();
  }, []);

  const fetchReparaciones = async () => {
    try {
      const res = await fetch('http://localhost:4000/reparaciones');
      const data = await res.json();
      setReparaciones(data);
    } catch (error) {
      console.error('Error al cargar reparaciones', error);
    }
  };

  const fetchAutos = async () => {
    try {
      const res = await fetch('http://localhost:4000/autos');
      const data = await res.json();
      setAutos(data);
    } catch (err) {
      console.error('Error al cargar autos', err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = editingId ? `http://localhost:4000/reparaciones/${editingId}` : 'http://localhost:4000/reparaciones';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('ID de auto inválido');
      await res.json();
      alert(editingId ? 'Reparación actualizada' : 'Reparación registrada');
      setForm({ auto_id: '', fecha: '', descripcion: '', costo: '' });
      setEditingId(null);
      fetchReparaciones();
    } catch (error) {
      alert(error.message || 'Error al guardar reparación');
    }
  };

  const handleEdit = (r) => {
    setForm({
      auto_id: r.auto_id._id || r.auto_id,
      fecha: r.fecha.substring(0, 10),
      descripcion: r.descripcion,
      costo: r.costo
    });
    setEditingId(r._id);
  };

  const getModeloAuto = (autoIdObj) => {
    if (typeof autoIdObj === 'object' && autoIdObj !== null && autoIdObj.modelo) {
      return autoIdObj.modelo;
    }
    const autoEncontrado = autos.find(a => a._id === autoIdObj);
    return autoEncontrado ? autoEncontrado.modelo : 'N/A';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestión de Reparaciones</h2>
        <Link to="/" className="btn btn-outline-light">
          🏠 Regresar al Home
        </Link>
      </div>

      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Auto</label>
                <select
                  name="auto_id"
                  value={form.auto_id}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecciona un auto --</option>
                  {autos.map(a => (
                    <option key={a._id} value={a._id}>
                      {a.marca} {a.modelo} ({a.placas})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha</label>
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Costo</label>
                <input type="number" name="costo" value={form.costo} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div className="mt-4 text-end">
              <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-success'}`}>
                {editingId ? 'Actualizar Reparación' : 'Guardar Reparación'}
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
                <th>Modelo</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reparaciones.map(r => (
                <tr key={r._id}>
                  <td>{getModeloAuto(r.auto_id)}</td>
                  <td>{r.fecha.substring(0, 10)}</td>
                  <td>{r.descripcion}</td>
                  <td>${r.costo}</td>
                  <td>
                    <button onClick={() => handleEdit(r)} className="btn btn-sm btn-outline-info me-2">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {reparaciones.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No hay reparaciones registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
