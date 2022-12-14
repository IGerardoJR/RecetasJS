// Declaramos los esquemas
const EsquemaReceta = require('../modelos/Receta');
// Cada receta cuenta con una calificacion
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

// Exportamos el controlador
module.exports.controller = (app) => {
  // Obtenemos todas las recetas
  app.get('/recetas', function(req, res) {
    EsquemaReceta.find({}, 'titulo descripcion nivel_dificultad tiempo_preparacion tiempo_coccion categoria ingredientes',
    (error, recetas) => {
      if (error) { console.error(error); }
      else {
        res.send({
          recetas,
        });
      }
    });
  });


// Obtener solo una receta
app.get('/recetas/:id',(req,res) => {
  EsquemaReceta.findById(req.params.id, 'titulo descripcion nivel_dificultad tiempo_preparacion tiempo_coccion categoria ingredientes',
  (error, receta) => {
    if(error) { console.error(error); }
    else {
      res.send(receta);
    }
  })
});

// Calificar una publicacion de receta
app.post('/recetas/calificar/:id',(req, res) => {
  const calif = new Calificacion({
    receta_id: req.params.id,
    usuario_id: req.body.usuario_id,
    calificacion: req.body.calificacion,
  });
  // Guardamos la calificacion
calif.save(function(erro, calificacion) {
  if(error) { console.log(error); }
  else {
    res.send({
      receta_id: calif.receta_id,
      usuario_id: calif.usuario_id,
      calificacion: calif.calificacion,
    });
  }
}); 
});
// Eliminar una receta
app.delete('/recetas:id',(req,res) => {
  EsquemaReceta.findByIdAndRemove(req.params.id, (error, receta) => {
    if(error) { console.error(error); }
    else {
      res.send({
        success: true,
        message: 'Receta eliminada',
      });
    }
  });
})

// Agregamos una receta
app.post('/recetas',(req,res) => {
  const nuevaReceta = new EsquemaReceta({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    nivel_dificultad: req.body.nivel_dificultad,
    tiempo_preparacion: req.body.tiempo_preparacion,
    tiempo_coccion: req.body.tiempo_coccion,
    categoria: req.body.categoria,
    ingredientes: req.body.ingredientes,
  });
  // Guardamos la receta
 nuevaReceta.save((error, receta) => {
  if(error) {
    res.send(error);
  }
  else{
    res.send(receta);
  }
 });
  })
};
