const EsquemaPelicula = require('../modelos/Pelicula');
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

module.exports.controller = (app) => {
  // obtener todas las películas
  app.get('/peliculas', function(req, res) {
    EsquemaPelicula.find({}, 'nombre descripcion anho_pub genero', 
    (error, peliculas) => {
      if (error) { console.error(error); }
      else {
        res.send({
          peliculas,
        });
      }
    });
  });

  // obtener una sola película
  app.get('/peliculas/:id', (req, res) => {
    EsquemaPelicula.findById(req.params.id, 'nombre descripcion anho_pub genero'
    , (error, pelicula) => {
      if (error) { console.error(error); }
      else {
        res.send(pelicula);
      }
    })
  });

  // calificar una película
  app.post('/peliculas/calificar/:id', (req, res) => {
    const calif = new Calificacion({
      pelicula_id: req.params.id,
      usuario_id: req.body.usuario_id,
      calificacion: req.body.calificacion,
    });

    calif.save(function (error, calificacion) {
      if (error) { console.log(error); }
      else {
        res.send({
          pelicula_id: calif.pelicula_id,
          usuario_id: calif.usuario_id,
          calificacion: calif.calificacion,
        });
      }
    });
  });

  // agregar una nueva película
  app.post('/peliculas', (req, res) => {
    const nuevaPelicula = new EsquemaPelicula({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      anho_pub: req.body.anho_pub,
      genero: req.body.genero,
    });

    nuevaPelicula.save((error, pelicula) => {
      if (error) { 
        console.error(error); 
        res.send(error);
      }
      else{
        res.send(pelicula);
      }
    });
  })
};