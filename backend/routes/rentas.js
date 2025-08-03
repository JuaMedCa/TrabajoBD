// ✅ routes/rentas.js
const express = require('express');
const router = express.Router();
const Renta = require('../models/Renta');
const Auto = require('../models/Auto'); // importa Auto para modificarlo

// Registrar renta
router.post('/', async (req, res) => {
  try {
    const nuevaRenta = new Renta(req.body);
    const resultado = await nuevaRenta.save();

    // Marcar el auto como no disponible
    await Auto.findByIdAndUpdate(req.body.auto_id, { disponible: false });

    res.json(resultado);
  } catch (error) {
    console.error(error);
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

// Actualizar renta
router.put('/:id', async (req, res) => {
  try {
    const rentaActualizada = await Renta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rentaActualizada) return res.status(404).json({ msg: 'Renta no encontrada' });
    res.json(rentaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar renta' });
  }
});

// ✅ Nueva ruta: autos más rentados en los últimos 2 meses
router.get('/mas-rentados', async (req, res) => {
  try {
    const haceDosMeses = new Date();
    haceDosMeses.setMonth(haceDosMeses.getMonth() - 2);

    const resultado = await Renta.aggregate([
      { $match: { fecha_inicio: { $gte: haceDosMeses } } },
      { $group: { _id: "$auto_id", total_rentas: { $sum: 1 } } },
      { $sort: { total_rentas: -1 } },
      {
        $lookup: {
          from: "autos",
          localField: "_id",
          foreignField: "_id",
          as: "auto"
        }
      },
      { $unwind: "$auto" },
      {
        $project: {
          _id: 0,
          auto_id: "$_id",
          marca: "$auto.marca",
          modelo: "$auto.modelo",
          año: "$auto.año",
          placas: "$auto.placas",
          total_rentas: 1
        }
      }
    ]);

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener autos más rentados" });
  }
});

module.exports = router;
