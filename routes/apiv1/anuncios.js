'use strict';

/**
 * Router que captura las peticiones para la versión apiv1 de la API.
 * @module routes/apiv1/anuncios
 */

const express = require('express');
const router = express.Router();
const retrieveJSON = require('../../lib/retrieveJSON');

const Anuncio = require('../../models/Anuncio');

/**
 * @api {get} /apiv1/anuncios Consulta de anuncios.
 * @apiVersion 0.0.1
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * 
 * @apiSuccess (API Response) {String} nombre Nombre del artículo del anuncio.
 * @apiSuccess (API Response) {Boolean} venta true = artículo a la venta; false = artículo buscado
 * @apiSuccess (API Response) {Number} precio Precio del artículo.
 * @apiSuccess (API Response) {String} foto Ruta de la foto en el servidor.
 * @apiSuccess (API Response) {String[]} tags Lista de tags asociados al artículo.
 */
router.get('/', async (req, res, next) => {
    try {
        const rows = await Anuncio.getList();

        res.json(retrieveJSON.setResult(retrieveJSON.OK, rows));
    } catch (err) {
        next(err);
    }
});

module.exports = router;