'use strict';

require('../models/Anuncio');
require('../models/Usuario');

const mongoose = require('mongoose');
const connection = mongoose.connection;

mongoose.Promise = global.Promise;

connection.on('error', err => {
    console.log('connMongoose. Ha ocurrido un error.', err);
    process.exit(1);
});

connection.once('open', () => {
    console.log('connMongoose. Se ha abierto conexión a', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
});

module.exports = connection;