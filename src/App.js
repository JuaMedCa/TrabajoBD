import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './Home';
import AutosForm from './autos';
import Clientes from './clientes';            // <— aquí
import RentasForm from './rentas';
import ReparacionesForm from './reparaciones';
import DevolucionesForm from './devoluciones';
import ListaAutosDisponibles from './ListaAutosDisponibles';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/autos" element={<AutosForm />} />
          <Route path="/clientes" element={<Clientes />} />       {/* <— aquí */}
          <Route path="/rentas" element={<RentasForm />} />
          <Route path="/reparaciones" element={<ReparacionesForm />} />
          <Route path="/devoluciones" element={<DevolucionesForm />} />
          <Route path="/autos-disponibles" element={<ListaAutosDisponibles />} />

        </Route>
      </Routes>
    </Router>
  );
}
