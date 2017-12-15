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
 * Elimina todos los documentos de la colección del modelo.
 * @name deleteAll
 * @static
 * @return {Promise} Promesa de la ejecución del borrado de todos los documentos.
 */
usuarioSchema.statics.deleteAll = function() {
    return Usuario.remove({}).exec();
};


usuarioSchema.statics.getUser = function(email) {
    const query = Usuario.findOne({ 'email': email });

    return query.exec();
};

usuarioSchema.statics.registerUser = function(nuevoUsuario) {
    return nuevoUsuario.save();
    // nuevoUsuario.save((err, usuarioGuardado) => {
    //     if (err) {
    //         const error = new Error('Password not found');
    //         error.status = 422; // Unprocessable Entity
    //         return callBack(error);    
    //     }
    // });
};


usuarioSchema.pre('save', function(next) {
    let user = this;
    user.encriptarClave(function(err, hash) {
        if (err) {
            return next(err);
        }
        // cambiamos la clave en texto limpio por la hasheada
        user.clave = hash;
        console.log('User.clave = ', user.clave);
        next();
    });
    // Generar el hash del password con el salt generado
    // bcrypt.hash(user.clave, process.env.BCRYPT_SALT_WORK_FACTOR, function(err, hash) {
    //     if (err) {
    //         return next(err);
    //     }
    //     // cambiamos la clave en texto limpio por la hasheada
    //     user.clave = hash;
    //     next();
    // });

    // bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_WORK_FACTOR), function(err, salt) {
    //         if (err) {
    //         return next(err);
    //     }
    //     // Generar el hash del password con el salt generado
    //     bcrypt.hash(user.clave, salt, function(err, hash) {
    //         if (err) {
    //             return next(err);
    //         }
    //         // cambiamos la clave en texto limpio por la hasheada
    //         user.clave = hash;
    //         next();
    //     });
    // });
});

// usuarioSchema.post('insertMany', async function(next) {
//     const usuarios = await Usuario.find().exec();
//     for (let i = 0; i < usuarios.length; i++) {
//         usuarios[i].encriptarClave(function(err, hash) {
//             if (err) {
//                 return next(err);
//             }
//             usuarios[i].clave = hash;
//             const usuarioActualizado = await usuarios[i].update();
//         });
//     }
//     // const bulkUsuarios = Usuario.collection.bulkWrite([],;
//     // bulkUsuarios.find({}).update(usuario.encriptarClave(function(err, hash) {
//     //         if (err) {
//     //             return next(err);
//     //         }
//     //         // cambiamos la clave en texto limpio por la hasheada
//     //         usuario.clave = hash;
//     // });
//     next();    
// });
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

    // let passwordMatched = false;
    
    // if (this.clave !== claveCandidata) {
    //     const error = new Error('Password not found');
    //     error.status = 422; // Unprocessable Entity
    //     return callBack(error);
    // }
    // passwordMatched = true;
    // callBack(null, passwordMatched);
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

// usuarioSchema.statics.encriptarClave = async function(claveNoEncriptada, callBack) {
//     try {
//         console.log('encriptarClave. claveNoEncriptada = ', claveNoEncriptada);
//         return await bcrypt.hash(claveNoEncriptada, parseInt(process.env.BCRYPT_SALT_WORK_FACTOR), function(err, hash) {
//             console.log('encriptarClave. err', err);
//             if (err) {
//                 callBack(err);
//             }
//             console.log('encriptarClave. clave = ', hash);
//             callBack(null, hash);
//         });

//         // if (Array.isArray(userCollection) && userCollection.length > 0) {
//         //     console.log('userCollection.length = ', userCollection.length);
//         //     for (let i = 0; i < userCollection.length; i++) {
//         //         console.log(`userCollection[${i}].clave NO encriptada = `, userCollection[i].clave);
//         //         let hash = await bcrypt.hash(userCollection[i].clave, parseInt(process.env.BCRYPT_SALT_WORK_FACTOR));
//         //         userCollection[i].clave = hash;
//         //         console.log(`userCollection[${i}].clave = `, userCollection[i].clave);
//         //         // await bcrypt.hash(userCollection[i].clave, parseInt(process.env.BCRYPT_SALT_WORK_FACTOR), function(err, hash) {
//         //         //     if (err) {
//         //         //         console.log('encriptarClave. ERROR!!!!!! ', err);
//         //         //         return callBack(err);
//         //         //     }
//         //         //     // cambiamos la clave en texto limpio por la hasheada
//         //         //     userCollection[i].clave = hash;
//         //         //     console.log(`hash[${i}] = `, hash);
//         //         //     console.log(`userCollection[${i}].clave = `, userCollection[i].clave);
//         //         // });
//         //     }
//         //     console.log('userCollection: ', userCollection);
//         //     callBack(null, userCollection);
//         // }
//     } catch(err) {
//         callBack(err);
//         // return;
//     }
// };

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;