import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DevolucionesForm() {
  const [form, setForm] = useState({
    renta_id: '',
    fecha: '',
    estado_auto: '',
    comentarios: ''
  });
  const [rentas, setRentas] = useState([]);
  const [devoluciones, setDevoluciones] = useState([]);

  // Filtros
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/rentas')
      .then(res => res.json())
      .then(data => setRentas(data));

    fetchDevoluciones();
  }, []);

  const fetchDevoluciones = () => {
    fetch('http://localhost:4000/devoluciones')
      .then(res => res.json())
      .then(data => setDevoluciones(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/devoluciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      await res.json();
      alert('Devolución registrada correctamente');
      setForm({ renta_id: '', fecha: '', estado_auto: '', comentarios: '' });
      fetchDevoluciones();
    } catch {
      alert('Error al registrar devolución');
    }
  };

  // Filtro aplicado
  const devolucionesFiltradas = devoluciones.filter(dev => {
    const coincideCliente = filtroCliente === '' || dev.renta?.cliente_id?.nombre?.toLowerCase().includes(filtroCliente.toLowerCase());
    const coincideFecha = filtroFecha === '' || dev.fecha.startsWith(filtroFecha);
    return coincideCliente && coincideFecha;
  });

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Registrar Devolución</h2>
      <Link to="/" className="btn btn-outline-primary mb-3">🏠 Regresar al Home</Link>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Renta</label>
          <select name="renta_id" className="form-select" value={form.renta_id} onChange={handleChange} required>
            <option value="">Seleccione una renta</option>
            {rentas.map(renta => (
              <option key={renta._id} value={renta._id}>
                {renta.cliente_id?.nombre} - {renta.auto_id?.marca} {renta.auto_id?.modelo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Devolución</label>
          <input type="date" name="fecha" className="form-control" value={form.fecha} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Estado del Auto</label>
          <input type="text" name="estado_auto" className="form-control" value={form.estado_auto} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Comentarios</label>
          <textarea name="comentarios" className="form-control" value={form.comentarios} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">Guardar Devolución</button>
      </form>

      {/* Filtros */}
      <div className="mb-4">
        <h4>🔍 Filtros del Historial</h4>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Buscar por cliente"
              className="form-control"
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          Historial de Devoluciones
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>Cliente</th>
                <th>Auto</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {devolucionesFiltradas.map((dev) => (
                <tr key={dev._id}>
                  <td>{dev.renta?.cliente_id?.nombre}</td>
                  <td>{dev.renta?.auto_id?.marca} {dev.renta?.auto_id?.modelo}</td>
                  <td>{new Date(dev.fecha).toLocaleDateString()}</td>
                  <td>{dev.estado_auto}</td>
                  <td>{dev.comentarios}</td>
                </tr>
              ))}
              {devolucionesFiltradas.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No hay devoluciones encontradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
