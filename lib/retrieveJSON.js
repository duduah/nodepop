'use strict';

const cError = require('./customErrors.json');

/**
 * Respuesta en formato JSON.
 * @module lib/retrieveJSON
 */

module.exports = {
    /**
     * Construye el JSON que se enviará en la respuesta.
     * @function
     * @name as
     * @param {Boolean} status - Resultado de la operación.
     * @param {Object, Object[]} [data] - Información a añadir a la respuesta.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado indicado y, opcionalmente, información adicional.
     */
    as: function(req, messageId, expressValidatorErrors) {
        const language = (req.query.lang || req.body.lang || 'es');
        let responseJson = cError[messageId];
        
        let objeto = {};
        if (!responseJson) {
            responseJson = cError['GENERAL_ERROR'];
        }
        objeto.status = responseJson.status;
        objeto.success = responseJson.success;
        if (req.originalUrl) {
            objeto.source = req.originalUrl;
        }
        objeto.result = responseJson.response[language];
        if (expressValidatorErrors) {
            for (let i = 0; i < Object.keys(expressValidatorErrors).length; i++) {
                let customMsgCode = expressValidatorErrors[Object.keys(expressValidatorErrors)[i]]['msg'];
                    expressValidatorErrors[Object.keys(expressValidatorErrors)[i]]['msg'] = responseJson.customMessages[customMsgCode].message[language]
                    || expressValidatorErrors[Object.keys(expressValidatorErrors)[i]]['msg'];
            }
            objeto.result.errors = expressValidatorErrors;
        }

        return objeto;
    },
    /**
     * Devuelve el mensaje de texto del error indicado.
     * @function
     * @name getMessage
     * @param {Object} req - Require.
     * @param {String} messageId - Identificador del mensaje.
     * @returns {String} Mensaje de error en el idioma indicado.
     */
    getMessage: function(req, messageId) {
        const language = ((req && (req.query.lang || req.body.lang)) || 'es');
        const responseJson = cError[messageId];

        return responseJson.response[language].detail;
    },
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
     * Construye el JSON que se enviará en la respuesta.
     * @function
     * @name setResult
     * @param {Boolean} status - Resultado de la operación.
     * @param {Object, Object[]} [data] - Información a añadir a la respuesta.
     * @returns {Object} El objeto JSON que se envía en la respuesta con el estado indicado y, opcionalmente, información adicional.
     */
    setError: function(error) {
        let objeto = {success: false};

        if (error) {
            objeto.error = error;
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
