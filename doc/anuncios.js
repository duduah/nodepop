/**
 * @api {get} /apiv2/anuncios Consulta de anuncios.
 * @apiHeader (Header Params) {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader (Header Params) {String} token Credenciales del usuario. Campo obligatorio para poder realizar las peticiones. Se comprueba si ha sido enviado por alguno de estos métodos:
 * @apiVersion 0.2.0
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * 
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
 * @apiUse AnunciosSuccessExample
 */

/**
 * @api {get} /apiv2/anuncios/tags Consulta los tags.
 * @apiHeader (Header Params) {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader (Header Params) {String} token Credenciales del usuario. Campo obligatorio para poder realizar las peticiones. Se comprueba si ha sido enviado por alguno de estos métodos:
 * @apiVersion 0.2.0
 * @apiName GetTags
 * @apiGroup Anuncios
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

 /**
 * @api {get} /apiv1/anuncios Consulta de anuncios.
 * @apiHeader (Header Params) {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader (Header Params) {String} token Credenciales del usuario. Campo obligatorio para poder realizar las peticiones. Se comprueba si ha sido enviado por alguno de estos métodos:
 * @apiVersion 0.1.0
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * 
 * @apiSuccess (API Response) {String} nombre Nombre del artículo del anuncio.
 * @apiSuccess (API Response) {Boolean} venta true = artículo a la venta; false = artículo buscado
 * @apiSuccess (API Response) {Number} precio Precio del artículo.
 * @apiSuccess (API Response) {String} foto Ruta de la foto en el servidor.
 * @apiSuccess (API Response) {String[]} tags Lista de tags asociados al artículo.
 * 
 * @apiUse AnunciosSuccessExample
 */

 