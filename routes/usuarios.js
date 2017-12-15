
const express = require('express');
const retrieveJSON = require('../lib/retrieveJSON');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const Usuario = mongoose.model('Usuario');


router.post('/register', [
    body('email').exists()
        .withMessage('Debe indicar una dirección de correo electrónico')
        .trim()
        .isEmail()
        .withMessage('Debe ser una dirección de correo electrónico válida.')
        .normalizeEmail()
        .custom((value) => {        
            return Usuario.getUserByEmail(value).then((usuario) => {
                if (usuario) {
                    throw new Error('Esta dirección de correo electrónico ya está registrada');
                } else {
                    return true;
                }
            });
        }),
    body('nombre').exists()
        .withMessage('Debe indicar un nombre de usuario'),
    body('clave').exists()
        .withMessage('Debe indicar una clave')
], async (req, res, next) => {
    try {
        validationResult(req).throw();

        const nuevoUsuario = await Usuario.registerUser(new Usuario(req.body));
        if (!nuevoUsuario) {
            const error = new Error('User or password');
            error.status = 404; // Not found
            return next(error);
        }
        // ************************************* quitar "clave" del json
        res.json(retrieveJSON.setResult(retrieveJSON.OK, nuevoUsuario));
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} /usuarios/authenticate Autenticación de usuario.
 */
router.post('/authenticate', async (req, res, next) => {
    try {
        // Recuperamos credenciales
        const email = req.body.email;
        const clave = req.body.clave;

        if (!email || !clave) {
            const error = new Error('Invalid user or password');
            error.status = 422; // Unprocessable Entity
            return next(error);
        }
        // Buscamos el usuario en bbdd
        const usuarioCandidato = await Usuario.getUserByEmail(email);
        if (!usuarioCandidato) {
            const error = new Error('User or password');
            error.status = 404; // Not found
            return next(error);
        }

        usuarioCandidato.comprobarPassword(clave, function(err, passwordMatched) {
            if (err || !passwordMatched) {
                throw err;
            }
            jwt.sign({ 'userId': usuarioCandidato._id}, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN
            }, (err, token) => {
                if (err) {
                    return next(err);
                }
                // Devolvemos el token en la respuesta
                res.json(retrieveJSON.setToken(token));
            });
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;