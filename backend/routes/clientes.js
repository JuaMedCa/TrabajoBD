// backend/routes/clientes.js
const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// ✅ Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// ✅ Registrar cliente
router.post('/', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.json(clienteGuardado);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
});

// ✅ Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ msg: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// ✅ Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ msg: 'Cliente no encontrado' });
    res.json({ msg: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;
