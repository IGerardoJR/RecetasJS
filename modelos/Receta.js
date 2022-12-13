const mongoose = require('mongoose');

const Esquema = mongoose.Schema;
const EsquemaReceta = new Esquema({
  titulo: String,
  descripcion: String,
  nivel_dificultad: String,
  tiempo_preparacion: String,
  tiempo_coccion: String,
  categoria: String,
  ingredientes: String,
});

const Receta = mongoose.model('Receta', EsquemaReceta);
module.exports = Receta;