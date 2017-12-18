# nodepop. Modelo de datos.
La base de datos [mongoDB](https://www.mongodb.com/) en la que se alojará la información de la api [nodepop](README.md) seguirá el modelo de datos para las colecciones:

* [anuncios](#modeloAnuncios)
* [usuarios](#modeloUsuarios)

### <a id="modeloAnuncios"></a>anuncios
Esta colección obedecerá al siguiente modelo:

```
{
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}
```
Los tags podrán ser cualesquiera de los siguientes:

* work
* lifestyle
* motor
* mobile

En esta colección se ha definido un índice por el campo `nombre`, ya que será por el que se realizarán las consultas. Para más información consultar la definición del modelo en [models/Anuncio.js](./models/Anuncio.js).

### <a id="modeloUsuarios"></a>usuarios
Para la colección de **usuarios** registrados el modelo es:

```
{
    nombre: String,
    email: String,
    clave: String
}
```

> **Nota**: el email es una **clave única** que identifica a cada usuario. No podrán darse de alta usuarios con una dirección de correo electrónico que ya esté registrada en la base de datos.

Para más información consultar la definición del modelo en [models/Usuario.js](./models/Usuario.js).


# Formato del fichero de datos.

El fichero [dataInit.json](./dataInit.json) contiene los datos de muestra para la precarga de la base de datos de esta API, que son:

* Un listado de **anuncios**.
* Un listado de **usuarios** de pruebas.

El formato del fichero se ha definido en base a ambas colecciones de la forma siguiente siguiente:

```javascript
{
    "anuncios": [
        {
            "nombre": String,
            "venta": Boolean,
            "precio": Number,
            "foto": String,
            "tags": [String]
        },
        ...
    ],
    usuarios: [
        {
            "nombre": String,
            "email": String,
            "clave": String
        },
        ...
    ]
}
```

> **Importante**: los datos de este fichero deben seguir el modelo tanto para anuncios como para usuarios respectivamente. Un cambio en la estructura del fichero, en los nombres de cualquier campo como en los de ambas colecciones (`anuncios` y `usuarios`) no hará posible la precarga de la base de datos.

Teniendo esto en cuenta, si por ejemplo se añaden al fichero usuarios con el mismo "email", la precarga dará un error ya que esta campo es **clave única**, o si algún anuncio no tiene un `true` o `false` en el campo "venta".