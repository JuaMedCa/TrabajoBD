const mongoose = require('mongoose');
require('dotenv').config(); // si usas .env

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI=mongodb+srv://jm689580:jm689580@cluster0.qcfe2ua.mongodb.net/RentaDeAutos?retryWrites=true&w=majority&appName=Cluster0
S, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Auto = require('../models/Auto'); // ajusta la ruta si es necesario

(async () => {
  try {
    // Corrige string "true"
    const res1 = await Auto.updateMany({ disponible: "true" }, { $set: { disponible: true } });

    // Corrige número 1
    const res2 = await Auto.updateMany({ disponible: 1 }, { $set: { disponible: true } });

    // Corrige si no existe el campo pero deberían estar disponibles
    const res3 = await Auto.updateMany({ disponible: { $exists: false } }, { $set: { disponible: true } });

    console.log('Actualizaciones realizadas:');
    console.log('- Strings "true" convertidos:', res1.modifiedCount);
    console.log('- Números 1 convertidos:', res2.modifiedCount);
    console.log('- Sin campo disponible, ahora true:', res3.modifiedCount);
  } catch (err) {
    console.error('Error al corregir autos:', err);
  } finally {
    mongoose.disconnect();
  }
})();
