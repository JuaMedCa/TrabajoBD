const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  año: { type: Number, required: true },
  placas: { type: String, required: true },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Auto', AutoSchema);
