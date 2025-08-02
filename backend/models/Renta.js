const mongoose = require('mongoose');

const RentaSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  auto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto' },
  fecha_inicio: Date,
  fecha_fin: Date,
  costo_total: Number
});

module.exports = mongoose.model('Renta', RentaSchema);
