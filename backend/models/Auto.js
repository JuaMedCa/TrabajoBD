const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  placas: String,
  disponible: Boolean
});

module.exports = mongoose.model('Auto', AutoSchema);
