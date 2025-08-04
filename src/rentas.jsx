import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RentasForm() {
  const [form, setForm] = useState({
    cliente_id: '',
    auto_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    costo_total: ''
  });

  const [clientes, setClientes] = useState([]);
  const [autos, setAutos] = useState([]);
  const [rentas, setRentas] = useState([]);

  useEffect(() => {
    fetchClientes();
    fetchAutos();
    fetchRentas();
  }, []);

  const fetchClientes = async () => {
    const res = await fetch('http://localhost:4000/clientes');
    const data = await res.json();
    setClientes(data);
  };

  const fetchAutos = async () => {
    const res = await fetch('http://localhost:4000/autos');
    const data = await res.json();
    setAutos(data);
  };

  const fetchRentas = async () => {
    const res = await fetch('http://localhost:4000/rentas');
    const data = await res.json();
    setRentas(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/rentas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al registrar renta');
      await res.json();
      alert('Renta registrada exitosamente');
      setForm({
        cliente_id: '',
        auto_id: '',
        fecha_inicio: '',
        fecha_fin: '',
        costo_total: ''
      });
      fetchRentas();
    } catch (error) {
      alert('Error al registrar renta');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold" style={{ color: 'white' }}>Registro de Rentas</h2>
        <Link to="/" className="btn btn-outline-light">🏠 Regresar al Home</Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Cliente</label>
            <select name="cliente_id" value={form.cliente_id} onChange={handleChange} className="form-select" required>
              <option value="">Selecciona un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Auto</label>
            <select name="auto_id" value={form.auto_id} onChange={handleChange} className="form-select" required>
              <option value="">Selecciona un auto</option>
              {autos.map(auto => (
                <option key={auto._id} value={auto._id}>
                  {auto.marca} {auto.modelo} ({auto.placas})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Fecha de Inicio</label>
            <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Fecha de Fin</label>
            <input type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Costo Total</label>
            <input type="number" name="costo_total" value={form.costo_total} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-success">Guardar Renta</button>
        </div>
      </form>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Auto</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Costo Total</th>
              </tr>
            </thead>
            <tbody>
              {rentas.map(renta => (
                <tr key={renta._id}>
                  <td>{renta.cliente_id?.nombre} {renta.cliente_id?.apellido}</td>
                  <td>{renta.auto_id?.marca} {renta.auto_id?.modelo}</td>
                  <td>{new Date(renta.fecha_inicio).toLocaleDateString()}</td>
                  <td>{new Date(renta.fecha_fin).toLocaleDateString()}</td>
                  <td>${renta.costo_total}</td>
                </tr>
              ))}
              {rentas.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No hay autos rentados actualmente</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
