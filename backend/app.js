// ✅ app.js completo y funcional
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const autosRoutes = require('./routes/autos');
const clientesRoutes = require('./routes/clientes');
const rentasRoutes = require('./routes/rentas');
const reparacionesRoutes = require('./routes/reparaciones');
const devolucionesRoutes = require('./routes/devoluciones');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/autos', require('./routes/autos'));
app.use(cors());
app.use(express.json());
app.use('/autos', autosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/rentas', rentasRoutes);
app.use('/reparaciones', reparacionesRoutes);
app.use('/devoluciones', devolucionesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));