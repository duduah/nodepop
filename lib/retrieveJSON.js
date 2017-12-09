'use strict';

/**
 * Respuesta en formato JSON.
 * @module lib/retrieveJSON
 */

module.exports = {
    /**
     * Construye el JSON que se enviará en la respuesta en caso de que la operación sea correcta.
     * @param {Object, Object[]} [data] - Información a añadir a la respuesta.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado OK y, opcionalmente, información adicional.
     */
    OK: function(data) {
        return (data) ? {
            success: true,
            result: data
        }
        : { success: true };
    },
    /**
     * Construye el JSON que se enviará en la respuesta en caso de que la operación sea errónea.
     * @param {Object, Object[]} [data] - Información a añadir a la respuesta.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado ERROR y, opcionalmente, información adicional.
     */
    ERROR: function(data) {
        return (data) ? {
            success: false,
            result: data
        }
        : { success: false };
    },
    /**
     * Construye el JSON que se enviará para la confirmación de las credenciales.
     * @param {String} token - Firma de autenticación del usuario para acceder a la API.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado OK y el token de la firma.
     */
    TOKEN: function(token) {
        return {
            success: true,
            token: token
        };
    }
};
