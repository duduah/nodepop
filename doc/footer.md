# Más información

## <span id="api-validaciones-anuncios"> Validaciones de anuncios </span>

No se ha hecho la validación de datos para peticiones de anuncios, aunque con el sistema implementado solo habría que:

1. Añadir las validaciones necesarias en el fichero [customErrors.json](../lib/customErrors.json), tanto generales como las del pool de validaciones de express-validator.
2. Incluir el pool de validaciones en el middleware del **get** de anuncios en [anuncios.js](../routes/apiv2/anuncios.js) usando la especificación de los errores del punto anterior.

