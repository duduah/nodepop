/**
 * @api {post} /usuarios/register Registrar un nuevo usuario.
 * @apiHeader (Header Params) {String} Content-Type application/x-www-form-urlencoded
 * @apiVersion 0.1.0
 * @apiName PostRegistroUsuario
 * @apiGroup Usuarios
 * 
 * @apiUse EnvioContentType
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
 * @apiSuccessExample Success-Response (example):
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
 * @apiUse UserErrorStack
 */

 
/**
 * @api {post} /usuarios/authenticate Autenticación de usuario.
 * @apiHeader (Header Params) {String} Content-Type application/x-www-form-urlencoded
 * @apiVersion 0.1.0
 * @apiName PostAuthUsuario
 * @apiGroup Usuarios
 * 
 * @apiUse EnvioContentType
 * 
 * @apiParam {String} email Dirección de correo electrónico que identifica al usuario.
 * @apiParam {String} clave Clave con la que accederá a la API.
 * @apiParam {String} [lang=es] (en | es | ...) Idioma en que se enviarán los errores al usuario.
 * 
 * @apiSuccess (Success Response) {String} token Credenciales del usuario.
 * 
 * @apiSuccessExample Success-Response (example):
 * {
 *     "success": true,
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTc2ZTAxZDgyNTJhYjU3ZmFhODljY2QiLCJpYXQiOjE1MTc3NDYxMTcsImV4cCI6MTUxNzkxODkxN305a36e6af138110684e8b992a"
 * }
 * 
 * @apiUse UserErrorStack
 */
