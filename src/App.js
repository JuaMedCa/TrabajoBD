// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<<<<<<< Updated upstream
import Home from './Home';
=======
import Home from './Home';  // Home ya contiene Navbar + Footer
>>>>>>> Stashed changes
import AutosForm from './autos';
import ClientesForm from './clientes';
import RentasForm from './rentas';
import ReparacionesForm from './reparaciones';
import DevolucionesForm from './devoluciones';
<<<<<<< Updated upstream
import ListaAutosDisponibles from './listarAutosDisponibles';
import './App.css';

=======
import ListaAutosDisponibles from './ListaAutosDisponibles';
import AutosMasRentados from './AutosMasRentados';
>>>>>>> Stashed changes

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autos" element={<AutosForm />} />
<<<<<<< Updated upstream
        <Route path="/clientes" element={<ClientesForm />} />
=======
        <Route path="/clientes" element={<Clientes />} />
>>>>>>> Stashed changes
        <Route path="/rentas" element={<RentasForm />} />
        <Route path="/reparaciones" element={<ReparacionesForm />} />
        <Route path="/devoluciones" element={<DevolucionesForm />} />
        <Route path="/autos-disponibles" element={<ListaAutosDisponibles />} />
<<<<<<< Updated upstream
=======
        <Route path="/mas-rentados" element={<AutosMasRentados />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}
