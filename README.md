# nodepop
<a id="nodepopUses"></a>**nodepop** uses:
![NPM version](https://img.shields.io/badge/npm-5.5.1-red.svg)
![NODE version](https://img.shields.io/badge/node-8.9.1-green.svg)
![MONGODB version](https://img.shields.io/badge/mongodb-3.4.10-green.svg)
or upper

### <a id="index"></a>Índice:

1. [Instalación.](#instalacion)
  1. [Prerrequisitos.](#prerrequisitos)
  2. [Clonar este repositorio e instalar dependencias.](#installStep1)
  3. [Especificar datos de conexión a la base de datos.](#installStep2)
  4. [Precargar la base de datos.](#installStep3)
2. 



Nodepop es una API Rest que proporciona información sobre anuncios a aquellos usuarios que estén registrados.

Esta API permite:

* Registrar usuarios.
* Consultar los anuncios y los tags de éstos, siempre que el usuario esté *autenticado*.


## <a id="instalacion"></a>Instalación.
### 1. <a id="prerrequisitos"></a>Prerrequisitos.
Antes de realizar la instalación es conveniente disponer del software indicado al [principio de este documento](#nodepopUses). Es decir:

![NPM version](https://img.shields.io/badge/npm-5.5.1-red.svg)
Tener instalado [npm](https://www.npmjs.com/) en esta versión o superiores.

![NODE version](https://img.shields.io/badge/node-8.9.1-green.svg)
Tener instalado [Node.js](https://nodejs.org/) en esta versión o superiores.

![MONGODB version](https://img.shields.io/badge/mongodb-3.4.10-green.svg)
Tener instalado el motor de base de datos [mongoDB](https://www.mongodb.com/) y que **esté arrancado** durante la instalación y ejecución de **nodepop**.


Se recomienda tener un directorio distinguible para nuestra base de datos. Por ello es recomendable arrancar mongoDB con el parámetro `--directoryperdb`. Un ejemplo de cómo arrancar mongoDB puede ser este:

```shell
$ mongod --dbpath ./data/db --directoryperdb
```

> **Nota**: se recomienda incluir estos comandos en un script (por ejemplo en un `*.sh`) que permita su ejecución de forma más sencilla.

### 2. <a id="installStep1"></a>Clonar este repositorio e instalar dependencias.
Descargar este repositorio o clonarlo desde `git` en un directorio que puede llamarse, por ejemplo, **nodepop**.
Una vez clonado, entrar en dicho directorio e instalar las dependencias con **npm**. Desde línea de comandos:

```shell
# Entrar en el directorio
$ cd nodepop

# Instalar dependencias
$ npm install
```
> Para más información sobre los paquetes requeridos para esta aplicación consultar el fichero [package.json](package.json).

### 3. <a id="installStep2"></a>Especificar datos de conexión a la base de datos.
Para configurar el acceso y conexión a la base de datos de la aplicación **nodepop** se debe crear el fichero `.env` con los datos de acceso y conexión. Para ello solo hay que renombrar el fichero de ejemplo **[.env.example](.env.example)** como **.env** y especificar en él lo valores necesarios descomentando las variables correspondientes.

### user:password
Por ejemplo, si mongoDB tiene habilitado el control de acceso, se deberá indicar con qué usuario/password deberá acceder **nodepop** a la base de datos indicándolo en `.env` en las variables `NODEPOP_MONGODB_USER` y `NODEPOP_MONGODB_PASSWORD`.

### host:port
Si se va a crear la base de datos en un host distinto al local y a través de un puerto específico distinto al puerto por defecto, se deberán indicar ambos datos en las variables `NODEPOP_MONGODB_HOST`, y `NODEPOP_MONGODB_PORT`.

### Valores por defecto
Si no se descomentan ni especifican dichos valores, la aplicación se conectará a la base de datos con lo valores por defecto:

* Sin usuario específico, asumiendo que mongodb no tiene habilitado el control de acceso.
* `NODEPOP_MONGODB_HOST=localhost`
* `NODEPOP_MONGODB_PORT=<default port>`

**Importante**: en caso de utilizar este fichero `.env` y por su naturaleza crítica **este fichero debe estar protegido y con acceso restringido**.

### 4. <a id="installStep3"></a>Precargar la base de datos.
Desde un terminal, en el directorio de `nodepop` y ejecutar:

```bash
$ npm run installDB
```
Al ejecutar este comando:

- [x] Se creará la base de datos **nodepop** en [mongoDB](https://www.mongodb.com/).
- [x] Se crearán las colecciones de **anuncios** y **usuarios** con datos de muestra.

Si ya se ha creado con anterioridad la base de datos **nodepop** y ambas colecciones, esta ejecución borrará todos los documentos de **anuncios** y **usuarios** y los volverá a cargar con los datos de muestra.

> **Nota**: los datos de muestra están en el fichero `dataInit.json`. Se puede modificar dicho fichero para añadir/quitar documentos tanto de anuncios como de usuarios siempre que se respete la estructura que dicta el [modelo](modelosDB.md).


#Revisar:

### Envío de token
indicar que el token se puede enviar por POST, GET o en la cabecera en el parámetro `x-access-token`.

### Encriptación de passwords
Según este artículo [^bcryptMongoBlog] se recomienda [bcrypt](https://github.com/kelektiv/node.bcrypt.js) para .

[^bcryptMongoBlog]: Password Authentication with Mongoose Part 1 | MongoDB Blog:  <https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1>
