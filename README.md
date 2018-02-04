# nodepop
<a id="nodepopUses"></a>**nodepop** uses:
![NVM version](https://img.shields.io/badge/nvm-0.33.6-red.svg)
![NPM version](https://img.shields.io/badge/npm-5.5.1-red.svg)
![NODE version](https://img.shields.io/badge/node-8.9.1-green.svg)
![MONGODB version](https://img.shields.io/badge/mongodb-3.4.10-green.svg)
or upper

**nodepop** es una API hecha para permitir a los usuarios buscar/ofertar productos que necesiten, ya no utilicen, etc.


### <a id="index"></a>Índice:

* [Instalación](#instalacion)
  1. [Prerrequisitos](#prerrequisitos)
  2. [Clonar este repositorio e instalar dependencias.](#installStep1)
  3. [Especificar las variables de entorno.](#installStep2)
  4. [Precargar la base de datos.](#installStep3)
* [Entornos de ejecución](#entornosEjecucion)
  1. [Entorno de desarrollo.](#entornoDev)
  2. [Entorno de producción.](#entornoProd)
* [Documentación de la API](#docApi)
* [**Práctica DevOps**](#devOps)


**nodepop** es una API Rest que proporciona anuncios con información sobre artículos que buscan o que venden a aquellos usuarios que estén registrados.

Esta API permite:

* Registrar usuarios.
* Consultar los **anuncios** y los **tags** de éstos, siempre que el usuario esté *autenticado*.


## <a id="instalacion"></a>Instalación.
### 1. <a id="prerrequisitos"></a>Prerrequisitos.
Antes de realizar la instalación es conveniente disponer del software indicado al [principio de este documento](#nodepopUses). Es decir:

![NVM version](https://img.shields.io/badge/nvm-0.33.6-red.svg)
Tener instalado [nvm](https://github.com/creationix/nvm/) en esta versión o superiores.

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
$ cd nodepop
nodepop/$ npm install
```
> Para más información sobre los paquetes requeridos para esta aplicación consultar el fichero [package.json](package.json).

### 3. <a id="installStep2"></a>Especificar las variables de entorno.
En el directorio de la aplicación se puede encontrar un fichero [.env.example](.env.example). **Renombrar dicho fichero a `.env`** y configurar las *variables de entorno* que utilizará la aplicación como se indica a continuación para que la API funcione correctamente:

#### Aplicación

* `PORT_DEFAULT_DEV` = puerto por el que atenderá la aplicación **nodepop** en **desarrollo**.
* `PORT_DEFAULT_PROD` = puerto por el que atenderá la aplicación **nodepop** en **producción**.

#### Base de datos

* `NODEPOP_MONGODB_USER` = nombre del usuario de bbdd con que la API se conectará a la bbdd mongoDB. Si no se indica, no se podrá acceder a la bbdd a menos que ésta no tenga control de acceso.
* `NODEPOP_MONGODB_PASSWORD` = clave de dicho usuario. Si no se indica, no se podrá acceder a la bbdd a menos que ésta no tenga control de acceso.
* `NODEPOP_MONGODB_HOST` (default=localhost). Host en el que se encuentra la base de datos. Si no se indica, se asumirá que es el host por defecto.
* `NODEPOP_MONGODB_PORT` (default=3000). Puerto desde el que la bbdd mongoDB escuchará las peticiones. Si no se indica, se asumirá que es el puerto por defecto.

#### Autenticación

* `JWT_SECRET_KEY` = clave privada con la que se encriptarán las credenciales de usuario.
* `JWT_EXPIRES_IN` = periodo de vida de las credenciales.

#### Hash de claves de usuario [(*)][bcryptMongoBlog]

* `BCRYPT_SALT_WORK_FACTOR` = número entero que representa el factor de trabajo para la encriptación de claves.

**HTTPS**

* `HTTPS_KEY_FILE` = Ruta del fichero key del certificado.
* `HTTPS_KEY_CERT` = Ruta del fichero cert del certificado.

> **Importante**: en caso de utilizar este fichero `.env` y por su naturaleza crítica **este fichero debe estar protegido y con acceso restringido**. Esto es, el usuario responsable de gestionar el sistema en producción debe **quitar todos los permisos a todos los usuarios** (incluido el de lectura), dejándose solo a si mismo los  permisos de lectura y escritura.  
> Para ello, dicho usuario deberá acceder por consola al directorio de **nodepop** y ejecutar el siguiente comando:
> 
> ```shell
> admin@server:nodepop/$ chmod go-rwx .env
> ```

### 4. <a id="installStep3"></a>Precargar la base de datos.
Desde un terminal, en el directorio de `nodepop` y ejecutar:

```bash
nodepop/$ npm run installDB
```
Al ejecutar este comando:

- [x] Se creará la base de datos **nodepop** en [mongoDB](https://www.mongodb.com/).
- [x] Se crearán las colecciones de **anuncios** y **usuarios** con datos de muestra.

Si ya se ha creado con anterioridad la base de datos **nodepop** con ambas colecciones, esta ejecución borrará todos los documentos de **anuncios** y **usuarios** y los volverá a cargar con los datos de muestra.

> **Nota**: los datos de muestra están en el fichero [`dataInit.json`](./dataInit.json). Se puede modificar dicho fichero para añadir/quitar documentos tanto de anuncios como de usuarios siempre que se respete la estructura que dicta el [modelo](modelosDB.md).


## <a id="entornosEjecucion"></a> Entornos de ejecución.
Siguiendo las [recomendaciones][performanceEnv] de [expressjs], se podrá arrancar la API tanto en modo `development` como en modo `production`.

### 1. <a id="entornoDev"></a> Entorno de desarrollo.
Para arrancar en este entorno basta con ejecutar lo siguiente desde la línea de comandos en el directorio de nuestra aplicación:

```shell
nodepop/$ npm run dev
```

Esto lanzará la aplicación de forma que:

* Activará el modo debug.
* No usará **clusters**.


### 2. <a id="entornoProd"></a> Entorno de producción.
Ejecutar en línea de comandos desde el directorio de la aplicación:

```shell
nodepop/$ npm run start
```

Esto lanzará la aplicación de forma que:

* Desactivará el modo debug.
* Usará los **clusters** que le permita el sistema en el que esté corriendo.

## <a id="docApi"></a> Documentación de la API.
Puede encontrar más información de la API en [aquí](./doc/index.html).


## <a id="devOps"></a> Práctica DevOps.
Para la evaluación de esta práctica se puede acceder a las siguientes direcciones:

**<https://diegogs.es>**  
Accederá a la web estática hecha a partir de una plantilla de [Start Bootstrap][startBootstrap].

**<https://nodepop.diegogs.es/>**  
Accederá a la vista web que devuelve la aplicación nodepop, donde se puede comprobar que **nginx** sirve los estáticos gracias a la cabecera personalizada **`X-Owner: duduah`**.

El acceso para comprobar el funcionamiento de la API, que devolverá la información y los errores en formato **JSON**, se puede ver en la documentación que se indica accediendo a 

**<https://34.216.33.119/>**  
Aunque la IP está Accederá a la web estática hecha a partir de una plantilla de [Start Bootstrap][startBootstrap].



<!-- Links-->

[performanceEnv]: http://expressjs.com/en/advanced/best-practice-performance.html "Performance Best Practices Usin Express | expressjs"

[bcryptMongoBlog]: https://github.com/kelektiv/node.bcrypt.js "brypt | NPM"

[expressjs]: http://expressjs.com "expressjs"

[startBootstrap]: https://startbootstrap.com "Start Bootstrap"

[diegogs]: https://diegogs.es "Diego GS"
[nodepop]: https://nodepop.diegogs.es/ "nodepop"
[ippublica]: https://34.216.33.119/ "Acceso por IP: 34.216.33.119"
