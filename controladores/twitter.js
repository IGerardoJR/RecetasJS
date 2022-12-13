const Usuario = require('../modelos/Usuario');
const passport = require('passport');
const config = require('./../config/Config');
//const Estrategia = require('passport-twitter-oauth2').Strategy;
const Estrategia = require('passport-twitter-oauth2').Strategy;
//const Estrategia = require('login-with-twitter').Strategy;

module.exports.controller = (app) => {
  // Estrategia de twitter
  passport.use(new Estrategia({
   clientID: config.TWITTER_APP_ID,
  consumerKey: config.TWITTER_APP_ID,
   userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    callbackURL: '/login/twitter/return',
    profileFields: ['id', 'displayName', 'email'],
  },
  (accessToken, refreshToken, perfil, callback) => {
    // Controlar login con twitter
    const email = perfil.emails[0].value;
    Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
      if (!usuario) {
        const nuevoUsuario = new Usuario({
          nombre: perfil.displayName,
          email: email,
          idExterno: perfil.id,
        });
        Usuario.crearUsuario(nuevoUsuario, (error) => {
          if (error) {
            // Manejar error
          } else {
            return callback(null, usuario);
          }
        });
      } else {
        return callback(null, usuario);
      }
      return true;
    });
  }));

  app.get('/login/twitter', passport.authenticate('twitter', { scope: [ 'email'] }));
  app.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });
};