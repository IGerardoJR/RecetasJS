// Declaramos los esquemas
const EsquemaReceta = require('../modelos/recetas');
// Cada receta cuenta con una calificacion
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

// Exportamos el controlador
module.exports.controller = (app) => {
  // Obtenemos todas las recetas
  app.get('/recetas', function(req, res) {
    EsquemaReceta.find({}, 'titulo descripcion nivel_dificultad tiempo_preparacion tiempo_coccion categoria ingredientes'),
    (error, recetas) => {
      if (error) { console.error(error); }
      else {
        res.send({
          recetas,
        });
      }
    }
  });
}

// Obtener solo una receta
app.get('/recetas/:id',(req,res) => {
  EsquemaReceta.findById(req.params.id, 'titulo descripcion nivel_dificultad tiempo_preparacion tiempo_coccion categoria ingredientes'),
  (error, receta) => {
    if(error) { console.error(error); }
    else {
      res.send(receta);
    }
  }
})