// backend/routes/reparaciones.js
const express = require('express');
const router = express.Router();
const Reparacion = require('../models/Reparacion');

// Registrar reparación
router.post('/', async (req, res) => {
  try {
    const nueva = new Reparacion(req.body);
    const guardada = await nueva.save();
    res.json(guardada);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar reparación' });
  }
});

// Obtener todas las reparaciones
router.get('/', async (req, res) => {
  try {
    const reparaciones = await Reparacion.find();
    res.json(reparaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reparaciones' });
  }
});

// Actualizar reparación
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Reparacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ msg: 'No encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reparación' });
  }
});


module.exports = router;
