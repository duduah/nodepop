var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const retrieveJSON = require('./lib/retrieveJSON');
var app = express();

/** Carga del conector a la base de datos */
require('./lib/connMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// Login
app.use('/usuarios', require('./routes/usuarios'));

// apiv1. Rutas
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));

// apiv2. Rutas
app.use('/apiv2/anuncios', require('./routes/apiv2/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // Manejar errores de express-validator
  if (err.array) {
    err.status = 422 // Unprocessable Entity
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req)
      ? { message: 'Not valid', errors: err.mapped()}   // para peticiones a la API
      : `Not valid - ${errInfo.param} ${errInfo.msg}`;  // para otras peticiones
  }

  res.status(err.status || 500);
  
  if (isAPI(req)) {
    res.json(retrieveJSON.setError(err.message));
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

/**
 * Comprueba si se está haciendo la petición a la API.
 * @param {Object} req - Objeto request
 * @returns true si se está accediendo a /apiv...
 */
function isAPI(req) {
  return identifyByURL(req, '/apiv');
}

function isUsuarios(req) {
  return identifyByURL(req, '/usuarios');
}

function identifyByURL(req, urlSnippet) {
  return req.originalUrl.indexOf(urlSnippet) === 0;
}

module.exports = app;
