// models/Devolucion.js
const mongoose = require('mongoose');

const DevolucionSchema = new mongoose.Schema({
  renta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Renta' },
  fecha: { type: Date, required: true },
  estado_auto: { type: String, required: true },
  comentarios: { type: String }
});

module.exports = mongoose.model('Devolucion', DevolucionSchema);
