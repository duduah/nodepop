'use strict';

const mongoose = require('mongoose');

/** Lista de tags que se admiten en este modelo. */
const tagList = ['work', 'lifestyle', 'motor', 'mobile'];

/** Nombre de la colección de la base de datos mongodb a la que corresponde este modelo. */
const COLLECTION_NAME = 'anuncios';

/** Número de elementos a mostrar en cada petición, si no se ha enviado ninguno en la petición. */
const defaultLimit = 100;

const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },
    venta: {
        type: Boolean,
        default: true
    },
    precio: {
        type: Number
    },
    foto: String,
    tags: {
        type: [String],
        enum: tagList
    }
}, {
    collection: COLLECTION_NAME
});

// Continuar con esto de los índices *******
//anuncioSchema.index({});     *******

/**
 * Devuelve el nombre de la colección a la que pertenece este modelo.
 * @name getCollectionName
 * @static
 * @returns {String} Nombre de la colección.
 */
anuncioSchema.statics.getCollectionName = () => {
    return Anuncio.collection.name;
    // return COLLECTION_NAME;
};

/**
 * Devuelve la lista con todos los tags que contempla el modelo de anuncios.
 * @name getTagList
 * @static
 * @return {[String]} Lista de tags.
 */
anuncioSchema.statics.getTagList = () => {
    return tagList;
};

/**
 * Devuelve una lista de anuncios según los criterios indicados.
 * @name getList
 * @static
 * @param {Object} [filters] - Objeto con los criterios de filtrado.
 * @param {Number} [limit] - Número de elementos de la consulta que se devuelven. Si no se especifica,
 * la consulta se limitará al valor por defecto {@link defaultLimit}. 
 * @param {Number} [skip] - Número de elementos de la consulta que se omiten.
 * @param {String} [sort] - Nombre del campo por el que se ordenan los resultados. Si se omite, se
 * ordenarán por el campo 'name' del modelo.
 * @param {String} [fields] - Nombres de los campos del modelo a devolver en la consulta. Si no se
 * indican, se devolverán todos.
 * @requires {Promise} Promesa de la ejecución de la consulta.
 */
anuncioSchema.statics.getList = function(filters, limit, skip, sort, fields) {
    /** Construcción de la query */
    const query = Anuncio.find(filters).
    limit(limit ? limit : defaultLimit).
    skip(skip).
    sort(sort ? sort : 'name').
    select(fields);

    /** Ejecución de la query */
    return query.exec();
};

/**
 * Elimina todos los documentos de la colección del modelo.
 * @name deleteAll
 * @static
 * @return {Promise} Promesa de la ejecución del borrado de todos los documentos.
 */
anuncioSchema.statics.deleteAll = function() {
    //return Anuncio.collection.drop().exec();
    return Anuncio.remove({}).exec();
};

/**
 * Comprueba el formato del precio enviado en el request.
 * Si cumple con uno de estos formatos (formatoRango): [0-0 | 0- | -0 | 0 | -]
 * Y salvando el último caso (-), si tiene algún número (numero), compone el filtro.
 * @function
 * @name getPrecioObject
 * @param {String} [precio] - Rango de precios por el que filtrar la búsqueda.
 * @return {Object} Devuelve un objeto con formato de filtro para la base de datos.
 */
anuncioSchema.statics.getPrecioObject = function(precio) {
    let objectPrecio = {};
    const formatoRango = /[0-9]*-?[0-9]*/; // valores que admite: [0-0 | 0- | -0 | 0 | - ]
    const gruposFormatoNumero = /([0-9]+)/g;
    const formatoNumero = /[0-9]+/;

    if (precio
        && formatoRango.test(precio)    // comprobar si precio cumple el formato
        && gruposFormatoNumero.test(precio)) {       // para el caso '-', comprobar si hay números
        let numeros = precio.match(gruposFormatoNumero); // 

        if (numeros.length > 1) {
            objectPrecio = {
                '$gte': numeros[0],
                '$lte': numeros[1]
            };
        } else if (precio === '-') {
            return objectPrecio;
        } else if (precio.startsWith('-')) {
            objectPrecio = {
                '$lte': numeros[0]
            };
        } else if (precio.endsWith('-')) {
            objectPrecio = {
                '$gte': numeros[0]
            };
        } else {
            objectPrecio = precio;
        }
    }
    console.log('objectPrecio = ', objectPrecio);
    return objectPrecio;    
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;