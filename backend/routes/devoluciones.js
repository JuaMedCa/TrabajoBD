// routes/devoluciones.js
const express = require('express');
const router = express.Router();
const Devolucion = require('../models/Devolucion');

// Registrar devolución
router.post('/', async (req, res) => {
  try {
    const devolucion = new Devolucion(req.body);
    const resultado = await devolucion.save();

    // Marcar auto como disponible nuevamente
    await Devolucion.populate(resultado, {
      path: 'renta_id',
      populate: ['auto_id']
    });

    if (resultado.renta_id?.auto_id?._id) {
      const Auto = require('../models/Auto');
      await Auto.findByIdAndUpdate(resultado.renta_id.auto_id._id, { disponible: true });
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar devolución' });
  }
});

// Obtener historial de devoluciones
router.get('/', async (req, res) => {
  try {
    const historial = await Devolucion.find()
      .populate({
        path: 'renta_id',
        populate: [
          { path: 'cliente_id', select: 'nombre apellido' },
          { path: 'auto_id', select: 'marca modelo' }
        ]
      });

    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de devoluciones' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Devolucion.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Error al eliminar devolución' });
  }
});

module.exports = router;
