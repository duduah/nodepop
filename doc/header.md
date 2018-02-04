## Especificaciones de uso de la API
Puede visitar <https://diegogs.es> para ver el funcionamiento de la API en producción.

### <span id="api-example-for-a-submenu-entry"> Peticiones que admite la API </span>

Esta API está preparada para recibir las siguientes peticiones:

* **Alta** de nuevos usuarios.
* **Autenticación de usuarios** ya registrados.

A los usuarios que estén autenticados se les permitirá realizar las siguientes peticiones:

* **Consulta de anuncios**, aplicando una serie de filtros que se indican a continuación en esta página.
* **Consulta de los tags** que admiten los artículos.

> El formato JSON de respuesta para errores se ha hecho siguiendo parcialmente las indicaciones expuestas **<http://jsonapi.org/>**. Concretamente las de la [sección de especificación de errores](http://jsonapi.org/examples/#error-objects-error-codes).


