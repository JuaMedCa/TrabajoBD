const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  placas: String,
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Auto', AutoSchema);
