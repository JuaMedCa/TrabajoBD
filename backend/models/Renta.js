// ✅ models/Renta.js
const mongoose = require('mongoose');

const RentaSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  auto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto', required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  costo_total: { type: Number, required: true }
});

module.exports = mongoose.model('Renta', RentaSchema);

