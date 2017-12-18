define({  "name": "nodepop",  "version": "0.0.1",  "description": "API Rest para consulta de anuncios",  "title": "nodepop API",  "url": "",  "sampleUrl": "https://www.myweb.com",  "header": {    "title": "General",    "content": "<h1>Especificaciones de uso de la API</h1>\n<p>asdf</p>\n<h2><span id=\"api-example-for-a-submenu-entry\"> Peticiones que admite la API </span></h2>\n<p>Esta API está preparada para recibir las siguientes peticiones:</p>\n<ul>\n<li><strong>Alta</strong> de nuevos usuarios.</li>\n<li><strong>Autenticación de usuarios</strong> ya registrados.</li>\n</ul>\n<p>Y a los usuarios que estén autenticados se les permitirá realizar las siguientes peticiones:</p>\n<ul>\n<li><strong>Consulta de anuncios</strong>, aplicando una serie de filtros que se indican a continuación en esta página.</li>\n<li><strong>Consulta de los tags</strong> que admiten los artículos.</li>\n</ul>\n"  },  "footer": {    "title": "Para más información",    "content": "<h1>Más información</h1>\n<h2><span id=\"api-validaciones-anuncios\"> Validaciones de anuncios </span></h2>\n<p>No se ha hecho la validación de datos para peticiones de anuncios, aunque con el sistema implementado solo habría que:</p>\n<ol>\n<li>Añadir las validaciones necesarias en el fichero <a href=\"../lib/customErrors.json\">customErrors.json</a>, tanto generales como las del pool de validaciones de express-validator.</li>\n<li>Incluir el pool de validaciones en el middleware del <strong>get</strong> de anuncios en <a href=\"../routes/apiv2/anuncios.js\">anuncios.js</a> usando la especificación de los errores del punto anterior.</li>\n</ol>\n"  },  "template": {    "withCompare": true,    "withGenerator": true  },  "defaultVersion": "0.0.0",  "apidoc": "0.3.0",  "generator": {    "name": "apidoc",    "time": "2017-12-17T23:47:08.152Z",    "url": "http://apidocjs.com",    "version": "0.17.6"  }});
