'use strict';

var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/** Nombre de la colección de la base de datos mongodb a la que corresponde este modelo. */
const COLLECTION_NAME = 'usuarios';

/** Formato que debe tener el campo email del model. */
const emailFormat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true},
        match: emailFormat
    },
    clave:  {
        type: String,
        required: true
    }
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
 * Devuelve el documento de la bbdd de un usuario con el email indicado.
 * @name getUserByEmail
 * @static
 * @param {String} email - Dirección por la que recuperar el usuario.
 * @returns {String} Nombre de la colección.
 */
usuarioSchema.statics.getUserByEmail = function(email) {
    const query = Usuario.findOne({ 'email': email });

    return query.exec();
};

usuarioSchema.statics.registerUser = function(nuevoUsuario) {
    return nuevoUsuario.save();
};


usuarioSchema.pre('save', function(next) {
    let user = this;
    user.encriptarClave(function(err, hash) {
        if (err) {
            return next(err);
        }
        // cambiamos la clave en texto limpio por la hasheada
        user.clave = hash;
        next();
    });
});

usuarioSchema.post('save', function(err, doc, next) {
    if (err) {
        return next(err);
    }
});

/**
 * Ver esto: http://jsonapi.org/examples/#error-objects-error-codes
 * 
 */
usuarioSchema.methods.comprobarPassword = function(claveCandidata, callBack) {
    let user = this;
    bcrypt.compare(claveCandidata, user.clave, function (err, isMatch) {
        if (err) {
            return callBack(err);
        }
        callBack(null, isMatch);
    });
};

usuarioSchema.methods.encriptarClave = function(callBack) {
    let user = this;
    bcrypt.hash(user.clave, parseInt(process.env.BCRYPT_SALT_WORK_FACTOR), function(err, hash) {
        if (err) {
            return callBack(err);
        }
        // cambiamos la clave en texto limpio por la hasheada
        user.clave = hash;
        callBack(null, hash);
    });
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;