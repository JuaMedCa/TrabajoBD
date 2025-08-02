import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import AutosForm from './autos';
import ClientesForm from './clientes';
import RentasForm from './rentas';
import ReparacionesForm from './reparaciones';
import DevolucionesForm from './devoluciones';
import ListaAutosDisponibles from './listarAutosDisponibles';
import './App.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autos" element={<AutosForm />} />
        <Route path="/clientes" element={<ClientesForm />} />
        <Route path="/rentas" element={<RentasForm />} />
        <Route path="/reparaciones" element={<ReparacionesForm />} />
        <Route path="/devoluciones" element={<DevolucionesForm />} />
        <Route path="/autos-disponibles" element={<ListaAutosDisponibles />} />
      </Routes>
    </Router>
  );
}
