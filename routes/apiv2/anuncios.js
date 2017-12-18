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
 * @api {get} /apiv2/anuncios Consulta de anuncios.
 * @apiVersion 0.0.2
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * @apiParam {String} token Credenciales del usuario. Campo obligatorio para poder realizar las peticiones. Se comprueba si ha sido enviado por alguno de estos métodos:
 * <ul>
 * <li><b>GET</b></li>
 * <li><b>POST</b></li>
 * <li><b>HEAD</b>, en el parámetro <b>x-access-token</b>.</li>
 * </ul>
 * @apiParam {String[]} [tag] Campo de filtro. Lista de tags asociados a los artículos. Se pueden enviar varios en una petición. Se recuperan los artículos que tengan <b>alguno de los tags indicados</b>.
 * @apiParam {Boolean} [venta] Campo de filtro. Indicador de compra/venta: <ul><li>true = se vende</li><li>false = se compra</li></ul>
 * @apiParam {String} [precio] Campo de filtro. Rango de precios. Tendrá el formato 99-99 (99=cualquier número) donde:
 * <ul>
 * <li><b>00-99</b>: consulta los artículos con un precio comprendido entre las cifras 00 y 99</li>
 * <li><b>00-</b>: consulta los artículos cuyo precio supere a la cifra indicada en 00</li>
 * <li><b>-99</b>: consulta los artículos cuyo precio sea inferior a la cifra indicada en 99</li>
 * <li><b>99</b>: consulta los artículos cuyo precio sea el de la cifra indicada en 99</li>
 * </ul>
 * @apiParam {String} [nombre] Campo de filtro. Nombre o parte del nombre del artículo a buscar. Se buscarán aquellos artículos cuyo nombre coincida o empiece por el indicado aquí.
 * @apiParam {String} [lang=es] (en | es | ...) Idioma en que se enviarán los errores al usuario.
 * 
 * @apiSuccess (API Response) {String} nombre Nombre del artículo del anuncio.
 * @apiSuccess (API Response) {Boolean} venta true = artículo a la venta; false = artículo buscado
 * @apiSuccess (API Response) {Number} precio Precio del artículo.
 * @apiSuccess (API Response) {String} foto Ruta de la foto en el servidor.
 * @apiSuccess (API Response) {String[]} tags Lista de tags asociados al artículo.
 * 
 * @apiSuccessExample Success-Response:
 *      {
 *          "success": true,
 *          "result": [
 *              {
 *                  "_id": "5a369971d1f3fc5031784cfc",
 *                  "nombre": "Cable",
 *                  "precio": 5.3,
 *                  "foto": "images/anuncios/cablePebble.jpg",
 *                  "__v": 0,
 *                  "tags": [
 *                      "mobile",
 *                      "lifestyle"
 *                  ],
 *                  "venta": true
 *              }
 *       }
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
            let objectPrecio = Anuncio.getPrecioObject(precio);

            if (objectPrecio && Object.keys(objectPrecio).length > 0) {
                filter.precio = objectPrecio;
            }
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

/**
 * @api {get} /apiv2/anuncios/tags Consulta los tags.
 * @apiVersion 0.0.2
 * @apiName GetTags
 * @apiGroup Anuncios
 * 
 * @apiParam {String} token Credenciales del usuario. Campo obligatorio para poder realizar las peticiones. Se comprueba si ha sido enviado por alguno de estos métodos:
 * <ul>
 * <li><b>GET</b></li>
 * <li><b>POST</b></li>
 * <li><b>HEAD</b>, en el parámetro <b>x-access-token</b>.</li>
 * </ul>
 * 
 * @apiSuccess (API Response) {String[]} tags Lista de tags que se pueden asignar a un artículo. Cada artículo puede tener uno o varios tags asociados.
 * 
 * @apiSuccessExample Success-Response:
 *       {
 *           "tags": [
 *               "work",
 *               "lifestyle",
 *               "motor",
 *               "mobile"
 *           ]
 *       }
 */
router.get('/tags', (req, res, next) => {
    res.json(Anuncio.getTagList());
});

module.exports = router;