const express = require('express');
const router = express.Router();
const Renta = require('../models/Renta');

// Registrar renta
router.post('/', async (req, res) => {
  try {
    const nuevaRenta = new Renta(req.body);
    const resultado = await nuevaRenta.save();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar renta' });
  }
});

// Obtener todas las rentas
router.get('/', async (req, res) => {
  try {
    const rentas = await Renta.find().populate('cliente_id auto_id');
    res.json(rentas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rentas' });
  }
});

module.exports = router;
