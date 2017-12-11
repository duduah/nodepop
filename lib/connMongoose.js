'use strict';

require('../models/Anuncio');
require('../models/Usuario');

const mongoDBHost = (process.env.NODEPOP_MONGODB_HOST || 'localhost');
const mongoDBPort = process.env.NODEPOP_MONGODB_PORT ? `:${process.env.NODEPOP_MONGODB_PORT}` : '';
const mongoDBUser = process.env.NODEPOP_MONGODB_USER ?  `${process.env.NODEPOP_MONGODB_USER}:` : '';
const mongoDBPass = process.env.NODEPOP_MONGODB_PASSWORD ? `${process.env.NODEPOP_MONGODB_PASSWORD}@` : '';

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

console.log('Enchufando a: ', `mongodb://${mongoDBHost}${mongoDBPort}/nodepop`);
mongoose.connect(`mongodb://${mongoDBUser}${mongoDBPass}${mongoDBHost}${mongoDBPort}/nodepop`, {
    useMongoClient: true
});

module.exports = connection;