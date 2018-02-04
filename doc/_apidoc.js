/**
 * @apiDefine EnvioContentType
 * 
 * @apiDescription El tipo de contenido (<code>Content-Type</code>) para estas peticiones se especificará en la cabecera como <code>application/x-www-form-urlencoded</code>.
 */

/**
 * @apiDefine UserErrorStack
 * 
 * @apiError (Error 422) status Código de error (422).
 * @apiError (Error 422) success Booleano que indica si la operaicón ha tenido éxito.
 * @apiError (Error 422) source URI desde la que se ha realizado la petición.
 * @apiError (Error 422) result Objeto con los detalles del error. Se detallan en los parámetros que vienen a continuación.
 * @apiError (Error 422) title Título genérico del error.
 * @apiError (Error 422) detail Descripción genérica del error.
 * @apiError (Error 422) errors Objeto que contiene la pila de errores detectados. Se detallan en los parámetros que vienen a continuación.
 * @apiError (Error 422) campo Campo enviado a la API que ha provocado el error. En nuestro ejemplo: <code>email</code> y <code>clave</code>. Se detalla en los parámetros que vienen a continuación.
 * @apiError (Error 422) location Desde dónde se ha enviado el campo.
 * @apiError (Error 422) param Nombre del campo.
 * @apiError (Error 422) [value] Valor del campo. <code>false</code> si el campo no viene informado.
 * @apiError (Error 422) msg Mensaje descriptivo del error provocado por este campo.
 * 
 * 
 * @apiErrorExample Error Stack (example):
 * {
 *   "status": 422,
 *   "success": false,
 *   "source": "/usuarios/authenticate",
 *   "result": {
 *       "title": "Identificación incorrecta",
 *       "detail": "Los datos introducidos para identificarse como usuario no cumplen con las validaciones establecidas.",
 *       "errors": {
 *           "email": {
 *               "location": "body",
 *               "param": "email",
 *               "value": false,
 *               "msg": "Debe indicar una dirección de correo electrónico válida"
 *           },
 *           "clave": {
 *               "location": "body",
 *               "param": "clave",
 *               "msg": "Debe indicar una clave"
 *           }
 *       }
 *   }
 * }
 */

/**
 * @apiDefine AnunciosSuccessExample
 * 
 * @apiSuccessExample Success-Response (example):
 * {
 *     "success": true,
 *     "result": [
 *         {
 *             "_id": "5a74ab2f3d6d52275255a62a",
 *             "nombre": "taza",
 *             "precio": 15,
 *             "foto": "images/anuncios/tazaSpongeBob.jpg",
 *             "__v": 0,
 *             "tags": [
 *                 "lifestyle",
 *                 "work"
 *             ],
 *             "venta": false
 *         }
 *     ]
 * }
 */