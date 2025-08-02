const express = require('express');
const router = express.Router();
const Auto = require('../models/Auto');

router.post('/', async (req, res) => {
  try {
    const nuevoAuto = new Auto(req.body);
    const resultado = await nuevoAuto.save();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar auto' });
  }
});

router.get('/disponibles', async (req, res) => {
  try {
    const autos = await Auto.find({ disponible: true });
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autos disponibles' });
  }
});

module.exports = router;
