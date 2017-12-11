'use strict';

/**
 * Respuesta en formato JSON.
 * @module lib/retrieveJSON
 */

module.exports = {
    /**
     * Construye el JSON que se enviará en la respuesta.
     * @function
     * @name setResult
     * @param {Boolean} status - Resultado de la operación.
     * @param {Object, Object[]} [data] - Información a añadir a la respuesta.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado indicado y, opcionalmente, información adicional.
     */
    setResult: function(status, result) {
        let objeto = {};
        objeto.success = status;

        if (result) {
            objeto.result = result;
        }
        return objeto;
    },
    /**
     * Indicador de estado del resultado de la operación.
     * Se usa con {@link setResult} para indicar que la operación ha acabado correctamente.
     */
    OK: true,
    /**
     * Indicador de estado del resultado de la operación.
     * Se usa con {@link setResult} para indicar que la operación ha acabado en error.
     */
    ERROR: false,
    /**
     * Construye el JSON que se enviará para la confirmación de las credenciales.
     * @param {String} token - Firma de autenticación del usuario para acceder a la API.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado OK y el token de la firma.
     */
    setToken: function(token) {
        return {
            success: true,
            token: token
        };
    }
};
