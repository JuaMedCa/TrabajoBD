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

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta devolución?")) {
      try {
        const res = await fetch(`http://localhost:4000/devoluciones/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error();
        fetchDevoluciones();
      } catch {
        alert('Error al eliminar devolución');
      }
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
          <select
            name="estado_auto"
            className="form-control"
            value={form.estado_auto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el estado</option>
             <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
            <option value="Dañado">Dañado</option>
            <option value="No funcional">No funcional</option>
            <option value="En revision">En revision</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Comentarios</label>
          <textarea name="comentarios" className="form-control" value={form.comentarios} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">Guardar Devolución</button>
      </form>


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
                <th>Acciones</th> {/* Nueva columna */}
              </tr>
            </thead>
            <tbody>
              {devolucionesFiltradas.map((dev) => {
                let rowClass = "";
                if (dev.estado_auto === "Excelente" || dev.estado_auto === "Bueno") {
                  rowClass = "table-success";
                } else if (dev.estado_auto === "Regular" || dev.estado_auto === "En revision") {
                  rowClass = "table-warning";
                } else if (
                  dev.estado_auto === "Malo" ||
                  dev.estado_auto === "Dañado" ||
                  dev.estado_auto === "No funcional"
                ) {
                  rowClass = "table-danger";
                }

                return (
                  <tr key={dev._id} className={rowClass}>
                    <td>{dev.renta_id?.cliente_id?.nombre}</td>
                    <td>
                      {dev.renta_id?.auto_id?.marca} {dev.renta_id?.auto_id?.modelo}
                    </td>
                    <td>{new Date(dev.fecha).toLocaleDateString()}</td>
                    <td>{dev.estado_auto}</td>
                    <td>{dev.comentarios}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm p-1"
                        style={{ fontSize: "0.85rem", width: "2em", height: "1.8em", display: "flex", alignItems: "center", justifyContent: "center" }}
                        onClick={() => handleDelete(dev._id)}
                        title="Eliminar"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
              {devolucionesFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No hay devoluciones encontradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
