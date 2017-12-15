'use strict';

/**
 * Router que captura las peticiones para la versión apiv2 de la API.
 * @module routes/apiv2/anuncios
 */

const express = require('express');
const router = express.Router();
const retrieveJSON = require('../../lib/retrieveJSON');
const jwtAuthentication = require('../../lib/jwtAuthentication');

const Anuncio = require('../../models/Anuncio');

/**
 * Validar credenciales
 */
router.use(jwtAuthentication());


/**
 * @api {get} /apiv2/anuncios Consulta de anuncios filtrando según los parámetros recibidos.
 * @apiVersion 0.0.2
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * @apiParam {String[]} [tag] Lista (opcional) de tags asociados a los artículos. Se pueden encontrar uno o más en la petición.
 * @apiParam {Boolean} [venta] Indicador (opcional) de compra/venta. true = se vende; false = se compra
 * @apiParam {String} [precio] Rango (opcional) de precios...
 * @apiParam {String} [nombre] Nombre (opcional) o parte del nombre del artículo a buscar.
 * 
 * @apiSuccess (API Response) {String} nombre Nombre del artículo del anuncio.
 * @apiSuccess (API Response) {Boolean} venta true = artículo a la venta; false = artículo buscado
 * @apiSuccess (API Response) {Number} precio Precio del artículo.
 * @apiSuccess (API Response) {String} foto Ruta de la foto en el servidor.
 * @apiSuccess (API Response) {String[]} tags Lista de tags asociados al artículo.
 */
router.get('/', async (req, res, next) => {
    try {
        let filter = {};
        const tags = req.query.tag;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const nombre = req.query.nombre;

        if (tags) {
            filter.tags = Array.isArray(tags)
                ? { '$in': tags}
                : tags;
        }
        if (venta) {
            filter.venta = venta;
        }
        if (precio) {
            filter.precio = Anuncio.getPrecioObject(precio);
        }
        if (nombre) {
            filter.nombre = new RegExp('^' + nombre, 'i');
        }

        const rows = await Anuncio.getList(filter);

        res.json(retrieveJSON.setResult(retrieveJSON.OK, rows));
    } catch (err) {
        next(err);
    }
});

module.exports = router;