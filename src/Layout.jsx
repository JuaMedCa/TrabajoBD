import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* Navbar fijo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span role="img" aria-label="car" className="me-2">🚗</span>
            <span className="fw-bold">Renta de Autos</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/autos">Autos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/rentas">Rentas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reparaciones">Reparaciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/devoluciones">Devoluciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/autos-disponibles">Autos Disponibles</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mas-rentados">Autos Más Rentados</Link></li> {/* ✅ NUEVO */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content" style={{ paddingTop: '70px', flex: 1 }}>
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <span>© 2025 Renta de Autos. Todos los derechos reservados.</span>
        </div>
      </footer>
    </>
  );
}
