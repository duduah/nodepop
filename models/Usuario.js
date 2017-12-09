'use strict';

var mongoose = require('mongoose');

/** Nombre de la colección de la base de datos mongodb a la que corresponde este modelo. */
const COLLECTION_NAME = 'usuarios';

/** Formato que debe tener el campo email del model. */
const emailFormat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        unique: true,
        match: emailFormat
    },
    clave: String
}, {
    collection: COLLECTION_NAME
});

/**
 * Devuelve el nombre de la colección a la que pertenece este modelo.
 * @name getCollectionName
 * @static
 * @returns {String} Nombre de la colección.
 */
usuarioSchema.statics.getCollectionName = () => {
    return Usuario.collection.name;
};

/**
 * Elimina todos los documentos de la colección del modelo.
 * @name deleteAll
 * @static
 * @return {Promise} Promesa de la ejecución del borrado de todos los documentos.
 */
usuarioSchema.statics.deleteAll = function() {
    return Usuario.remove({}).exec();
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;