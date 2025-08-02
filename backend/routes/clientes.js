const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Registrar cliente
router.post('/', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const resultado = await nuevoCliente.save();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

module.exports = router;
