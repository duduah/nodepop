#nodepop

![NPM version](https://img.shields.io/badge/npm-5.5.1-red.svg)
![NODE version](https://img.shields.io/badge/node-8.9.1-green.svg)
![EXPRESS version](https://img.shields.io/badge/express-4.15.5-green.svg)
![MONGODB version](https://img.shields.io/badge/mongodb-3.4.10-green.svg)

Nodepop es una API Rest que proporciona información sobre anuncios a aquellos usuarios que estén registrados.

Esta API ha 

## Formato del fichero de datos.

El fichero `dataInit.json` para la precarga de la base de datos mongodb de esta API contendrá:

* Un listado de **anuncios**.
* Un listado de usuarios de pruebas.

El formato del fichero será el siguiente:

```javascript
{
    "anuncios": [
        {
            "nombre" : String,
            "venta" : Boolean,
            "precio" : Number,
            "foto" : String,
            "tags" : [String]
        },
        ...
    ],
    usuarios: [
        {
            "nombre" : String,
            "email" : String,
            "clave" : String
        },
        ...
    ]
}
```
