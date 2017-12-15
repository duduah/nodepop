'use strict';

const jwt = require('jsonwebtoken');


/**
 * Ver esto!!!!!!
 * http://jsonapi.org/examples/#error-objects-error-codes
 */
module.exports = () => {
    return (req, res, next) => {
        console.log('jswAuthentication. Comenzamos');
        // Comprobar si ha llegado el token en la petición
        const token = req.body.token
            || req.query.token
            || req.get('x-access-token');
            
        if (!token) {
            const error = new Error('No token to authorize access');
            error.status = 401; // Unauthorized
            return;
        }
        
        // Comprobar si el token es correcto
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // Token incorrecto
                const error = new Error('Invalid token');
                error.status = 401; // Unauthorized
                return;
            }
            // Añadimos el userId extraido del token al request para que se
            // pueda usar desde otros middlewares.
            req.userId = decoded.userId;
            next();
        });
    };
};