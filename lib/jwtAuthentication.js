'use strict';

const jwt = require('jsonwebtoken');
const cError = require('./customErrors.json');


/**
 * Ver esto!!!!!!
 * http://jsonapi.org/examples/#error-objects-error-codes
 */
module.exports = () => {
    return (req, res, next) => {
        // Comprobar si ha llegado el token en la petición
        const token = req.body.token
            || req.query.token
            || req.get('x-access-token');
            
        if (!token) {
            const error = new Error(cError.TOKEN_REQUIRED.code);
            error.status = cError.TOKEN_REQUIRED.status; // Unauthorized
            return next(error);
        }
        
        // Comprobar si el token es correcto
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // Token incorrecto
                const error = new Error(cError.INVALID_TOKEN.code);
                error.status = cError.INVALID_TOKEN.status; // Unauthorized
                return next(error);
            }
            // Añadimos el userId extraido del token al request para que se
            // pueda usar desde otros middlewares.
            req.userId = decoded.userId;
            next();
        });
    };
};