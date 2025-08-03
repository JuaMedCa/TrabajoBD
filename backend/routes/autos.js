const express = require('express');
const router = express.Router();
const Auto = require('../models/Auto');

// Obtener todos los autos
router.get('/', async (req, res) => {
  try {
    const autos = await Auto.find();
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autos' });
  }
});

// Obtener autos disponibles
router.get('/disponibles', async (req, res) => {
  try {
    const autosDisponibles = await Auto.find({ disponible: true });
    res.json(autosDisponibles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autos disponibles' });
  }
});

// Registrar nuevo auto
router.post('/', async (req, res) => {
  try {
    const nuevoAuto = new Auto(req.body);
    const resultado = await nuevoAuto.save();
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar auto' });
  }
});

// Actualizar auto
router.put('/:id', async (req, res) => {
  try {
    const autoActualizado = await Auto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!autoActualizado) return res.status(404).json({ msg: 'Auto no encontrado' });
    res.json(autoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar auto' });
  }
});

// Eliminar auto
router.delete('/:id', async (req, res) => {
  try {
    await Auto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Auto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar auto' });
  }
});

module.exports = router;
