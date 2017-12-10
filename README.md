# nodepop

<a id="nodepopUses"></a>**nodepop** uses:
![NPM version](https://img.shields.io/badge/npm-5.5.1-red.svg)
![NODE version](https://img.shields.io/badge/node-8.9.1-green.svg)
![MONGODB version](https://img.shields.io/badge/mongodb-3.4.10-green.svg)
or upper

Nodepop es una API Rest que proporciona información sobre anuncios a aquellos usuarios que estén registrados.

Esta API permite:

* Registrar usuarios.
* Consultar los anuncios y los tags de éstos, siempre que el usuario esté *autenticado*.

# Instalación
### Prerrequisitos.
Antes de realizar la instalación es conveniente disponer del software indicado al [principio de este documento](#nodepopUses).

### 1. Clonar este repositorio e instalar dependencias.
Una vez clonado, instalar las dependencias con **npm** desde el directorio de **nodepop**. Desde línea de comandos:

```shell
$ cd nodepop

myUser at myComputer in ~/.../nodepop on master*
$ npm i
```
> Para más información sobre los paquetes requeridos para esta aplicación consultar el fichero [package.json](package.json).

### 2. Especificar datos de conexión a la base de datos.
Para configurar el acceso y conexión a la base de datos de la aplicación **nodepop** se debe crear el fichero `.env` con los datos de acceso y conexión.

Para ello solo hay que renombrar el fichero de ejemplo **[.env.example](.env.example)** como **.env** y especificar en él lo valores necesarios descomentando las variables correspondientes.

#### user/password
Por ejemplo, si mongoDB tiene habilitado el control de acceso, se deberá indicar con qué usuario/password deberá acceder **nodepop** a la base de datos indicándolo en `.env` en las variables `NODEPOP_MONGODB_USER` y `NODEPOP_MONGODB_PASSWORD`.

#### host:port
Si se va a crear la base de datos en un host distinto al local y a través de un puerto específico distinto al puerto por defecto, se deberán indicar ambos datos en las variables `NODEPOP_MONGODB_HOST`, y `NODEPOP_MONGODB_PORT`.

#### Valores por defecto
Si no se descomentan ni especifican dichos valores, la aplicación se conectará a la base de datos con lo valores por defecto:

* Sin usuario específico, asumiendo que mongodb no tiene habilitado el control de acceso.
* `NODEPOP_MONGODB_HOST=localhost`
* `NODEPOP_MONGODB_PORT=<default port>`

### 3. Precargar la base de datos.
Desde un terminal, en el directorio de `nodepop` y ejecutar:

```bash
$ npm run installDB
```
Al ejecutar este comando:

- [x] Se creará la base de datos **nodepop** en [mongoDB](https://www.mongodb.com/).
- [x] Se crearán las colecciones de **anuncios** y **usuarios** con datos de muestra.

Si ya se ha creado con anterioridad la base de datos **nodepop** y ambas colecciones, esta ejecución borrará todos los documentos de **anuncios** y **usuarios** y los volverá a cargar con los datos de muestra.

> **Nota**: los datos de muestra están en el fichero `dataInit.json`. Se puede modificar dicho fichero para añadir/quitar documentos tanto de anuncios como de usuarios siempre que se respete la estructura que dicta el [modelo](modelosDB.md).


