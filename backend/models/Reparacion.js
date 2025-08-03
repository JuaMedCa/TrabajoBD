// backend/models/Reparacion.js
const mongoose = require('mongoose');

const ReparacionSchema = new mongoose.Schema({
  auto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auto',
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  costo: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Reparacion', ReparacionSchema);
