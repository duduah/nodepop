
const express = require('express');
const retrieveJSON = require('../lib/retrieveJSON');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cError = require('../lib/customErrors.json');

const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const Usuario = mongoose.model('Usuario');

/**
 * @apiDefine WrongEmailFormatError
 * 
 * @apiError (Error 422) WRONG_EMAIL_FORMAT Error de validación de datos de entrada.
 * Debe indicar una dirección de correo electrónico válida
 * 
 * @apiErrorExample Error-Response:
 *        {
 *            "status": 422,
 *            "success": false,
 *            "source": "/usuarios/register",
 *            "result": {
 *                "title": "Error in your user registratrion",
 *                "detail": "Data provided for your registry does not pass validation requirements",
 *                "errors": {
 *                    "email": {
 *                        "location": "body",
 *                        "param": "email",
 *                        "value": false,
 *                        "msg": "The email address format doesn't match the standard"
 *                    }
 *                }
 *            }
 *        }
 */

/**
 * @api {post} /usuarios/register Registrar un nuevo usuario.
 * @apiVersion 0.0.2
 * @apiName PostRegistroUsuario
 * @apiGroup Usuarios
 * 
 * @apiParam {String} nombre Nombre (alias) del usuario.
 * @apiParam {String} email Dirección de correo electrónico. Este será el que identifique al usuario.
 * @apiParam {String} clave Clave con la que accederá a la API.
 * @apiParam {String} [lang=es] (en | es | ...) Idioma en que se enviarán los errores al usuario.
 * 
 * @apiSuccess (API Response) {String} nombre Nombre indicado por el usuario.
 * @apiSuccess (API Response) {String} email Correo que identifica al usuario.
 * @apiSuccess (API Response) {String} clave Clave cifrada del usuario.
 * 
 * @apiSuccessExample Success-Response:
 *       {
 *           "success": true,
 *           "result": {
 *               "__v": 0,
 *               "nombre": "hola",
 *               "email": "d@hola.es",
 *               "clave": "$2a$10$qI/oXLs8kY9K1TYOUuctxeJ4WB34BpG8I4yoU4J/m3cE16qD5lyYe",
 *               "_id": "5a36e6af138110684e8b992a"
 *           }
 *       }
 * 
 * @apiUse WrongEmailFormatError
 * 
 * @apiError (Error 422) WRONG_REGISTRY Error de validación en el registro de su usuario.
 * @apiError (Error 422) EMAIL_ALREADY_EXIST Esta dirección de correo electrónico ya está registrada. Por favor, use otra distinta.
 * @apiError (Error 422) MUST_ENTRY_EMAIL Debe indicar una dirección de correo electrónico.
 * @apiError (Error 422) MUST_ENTRY_PASSWORD Debe indicar una clave.
 * @apiError (Error 422) WRONG_EMAIL_FORMAT Debe indicar una dirección de correo electrónico válida.
 * @apiError (Error 422) MUST_ENTRY_USERNAME Debe indicar un nombre de usuario.
 */
router.post('/register', [
    body('email').exists()
        .withMessage(cError.WRONG_REGISTRY.customMessages.MUST_ENTRY_EMAIL.code)
        .trim()
        .isEmail()
        .withMessage(cError.WRONG_REGISTRY.customMessages.WRONG_EMAIL_FORMAT.code)
        .normalizeEmail()
        .custom((value) => {
            return Usuario.getUserByEmail(value).then((usuario) => {
                if (usuario) {
                    throw new Error(cError.WRONG_REGISTRY.customMessages.EMAIL_ALREADY_EXIST.code);
                } else {
                    return true;
                }
            });
        }),
    body('nombre').exists()
        .withMessage(cError.WRONG_REGISTRY.customMessages.MUST_ENTRY_USERNAME.code),
    body('clave').exists()
        .withMessage(cError.WRONG_REGISTRY.customMessages.MUST_ENTRY_PASSWORD.code)
], async (req, res, next) => {
    try {
        // validationResult(req).throw();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(retrieveJSON.as(req, cError.WRONG_REGISTRY.code, errors.mapped()))
        }

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
 * @apiVersion 0.0.2
 * @apiName PostAuthUsuario
 * @apiGroup Usuarios
 * @apiParam {String} email Dirección de correo electrónico que identifica al usuario.
 * @apiParam {String} clave Clave con la que accederá a la API.
 * @apiParam {String} [lang=es] (en | es | ...) Idioma en que se enviarán los errores al usuario.
 * 
 * @apiSuccess (API Response) {String} token Credenciales cifradas del usuario.
 * 
 * @apiError (Error 422) WRONG_AUTHENTICATION Identificación incorrecta.
 * @apiUse WrongEmailFormatError
 * @apiError (Error 422) EMAIL_NOT_REGISTERED La dirección de correo electrónico introducida no está registrada.
 * @apiError (Error 422) MUST_ENTRY_EMAIL Debe indicar una dirección de correo.
 * @apiError (Error 422) WRONG_EMAIL_FORMAT Debe indicar una dirección de correo electrónico válida.
 */
router.post('/authenticate', [
    body('email').exists()
        .withMessage(cError.WRONG_AUTHENTICATION.customMessages.MUST_ENTRY_EMAIL.code)
        .trim()
        .isEmail()
        .withMessage(cError.WRONG_AUTHENTICATION.customMessages.WRONG_EMAIL_FORMAT.code)
        .normalizeEmail()
        .custom((value) => {
            return Usuario.getUserByEmail(value).then((usuario) => {
                if (!usuario) {
                    throw new Error(cError.WRONG_AUTHENTICATION.customMessages.EMAIL_NOT_REGISTERED.code);
                } else {
                    return true;
                }
            });
        }),
    body('clave').exists()
        .withMessage(cError.WRONG_AUTHENTICATION.customMessages.MUST_ENTRY_PASSWORD.code)
], async (req, res, next) => {
    try {
        // validationResult(req).throw();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(retrieveJSON.as(req, cError.WRONG_AUTHENTICATION.code, errors.mapped()))
        }

        // Recuperamos credenciales
        const email = req.body.email;
        const clave = req.body.clave;

        // Buscamos el usuario en bbdd
        const usuarioCandidato = await Usuario.getUserByEmail(email);
        if (!usuarioCandidato) {
            const error = new Error(cError.WRONG_USER.code);
            error.status = cError.WRONG_USER.status; // Not found
            return next(error);
        }

        usuarioCandidato.comprobarPassword(clave, function(err, passwordMatched) {
            if (err || !passwordMatched) {
                const error = new Error(cError.WRONG_PASSWORD.code);
                error.status = cError.WRONG_PASSWORD.status;
                return next(error);
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