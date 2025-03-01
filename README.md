# COPEREX Enterprise

Esta es una simple API para permitir a los administradores administrar, valga la redundancia, una base de datos de empresas que trabajarán con Coperex en la Inerfer y, a su vez, generar reportes de los mismos en formato de Excel. Swagger contiene información más a fondo sobre las distintas funciones que pueden hallarse en este programa.

## Estructura Básica de las Rutas

Esta aplicación, según el `.env`, se ejecuta desde el puerto 3000. Esto significa que la manera de acceder a las funciones de la API, es por medio de la dirección:

```
http://localhost:3000/coperex-enterprise/v1/<módulo>/<acción>?posibles-parámetros
```

Y, a su vez:

```
.../<módulo>/<acción>/<subacción>?posibles-parámetros
```

## Autenticación y Manejo de Administradores

Para poder utilizar correctamente esta API, se debe estar autenticado como un usuario perteneciente a la base de datos. Para lograr esto, se utiliza un token de acceso JWT que es generado a la hora de iniciar sesión.

### Autenticación

#### Registrar Administrador

> Método: `POST`  
> Ruta: `.../auth/register`  
> Acepta Parámetros Adicionales: No

Una vez colocada el tipo de solicitud correcta, se procede a enviar junto con un formato JSON con la siguiente estructura:

```JSON
{
    "name": "<nombre>",
    "lastName": "<apellido>",
    "username": "<usuario-único>",
    "email": "<email-válido>",
    "password": "<contraseña>", //min 8 caracteres; al menos 1 caracter mayús., minus., número., y símbolo.
    "phone": "<número-telefónico-menor-a-10-dígitos>"
}
```

#### Iniciar Sesión (Obtener Token de Acceso)

> Método: `POST`  
> Ruta: `.../auth/login`  
> Acepta Parámetros Adicionales: No

Para obtener el JWT de una sesión válida, se coloca la solicitud correcta junto a un JSON con esta información:

```JSON
{
    "username": "<usuario-válido>",
    "email": "<correo-válido>",
    "password": "<contraseña-de-cuenta>"
}
```

Nota: Solo está admitido el uso de el correo o la contraseña. Para elegir con cuál iniciar sesión, solo escriba uno de los dos parámetros.

### Opciones de Usuario

#### Acceder a Perfil de Administrador

> Método: `GET`  
> Ruta: `.../user/profile/:uid`  
> Acepta Parámetros Adicionales: No

Al registrar un usuario se obtiene una cadena de texto en la respuesta. Este es el UID, y es el identificador único de cada usuario. Este se tiene que colocar en la ruta.

#### Editar Información del Usuario (Menos Contraseña)

> Método: `PUT`  
> Ruta: `.../user/update`  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación

Esta función no requiere de colocar el UID en la ruta porque esta se obtiene del token. Una vez colocado el token en la solicitud, se envía junto a un JSON con el siguiente contenido:

```JSON
{
    "name": "",
    "lastName": "",
    "username": "",
    "email": "",
    "phone": ""
}
```

Ningún atributo es obligatorio. Si decide no incluir alguno, el que no se haya tocado seguirá sin cambios. Para esto, omita los parámetros que _no_ quiere modificar.

#### Editar Contraseña

> Método: `PATCH`  
> Ruta: `.../user/update/password`  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación.

Mismo proceso que con el anterior. El JSON que se envía tiene que ser:

```JSON
{
    "newPassword": ""
}
```

Las mismas reglas para crear una contraseña se aplican. El nombre del atrubuto tienne que ser exactamente ese.

## Manejo de Compañías

### Creación de Compañías

> Método: `POST`  
> Ruta: `.../company/add`  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación.

Una vez colocado la solicitud correcta, se envía con un JSON con los siguientes datos:

```JSON
{
    "name": "<nombre-de-empresa>",
    "address": "<dirección-de-empresa>",
    "email": "<correo-de-empresa>",
    "phone": "<teléfono-de-empresa>",
    "impact": "<impacto>", // Únicos valores aceptados: ALTO, MEDIO, BAJO.
    "foundationDate": "<fecha-de-creación-de-la-empresa>", // Formato de fecha aceptado, YYYY-MM-DD
    "category": "<categoría-de-la-empresa>" // De preferencia una sola palabra que describa el área que cubre.
}
```

### Edición de Compañías

> Método: `PUT`  
> Ruta: `.../company/edit/:id`  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación.

Una vez colocado la solicitud correcta, se envía con un JSON con los siguientes datos:

```JSON
{
    "name": "<nombre-de-empresa>",
    "address": "<dirección-de-empresa>",
    "email": "<correo-de-empresa>",
    "phone": "<teléfono-de-empresa>",
    "impact": "<impacto>", // Únicos valores aceptados: ALTO, MEDIO, BAJO.
    "foundationDate": "<fecha-de-creación-de-la-empresa>", // Formato de fecha aceptado, YYYY-MM-DD
    "category": "<categoría-de-la-empresa>" // De preferencia una sola palabra que describa el área que cubre.
}
```

De nuevo, los parámetros que no se deseen editar no se deben colocar.

### Listado de Compañías

> Método: `GET`  
> Ruta: `.../company/:id` (individual) y `.../company/list` (general)  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación y Otros.

Una vez colocada la autenticación, se puede enviar la solicitud para obtener la compañía(s) deseadas.

#### Filtración de Compañías

En cuanto al orden en que aparecen las compañías cuando se usa el listado general, fácilmente se puede elegir qué atributo seleccionar para el filtrado y en qué orden se desea que filtre.

```
.../company/list?sort=valor&order=valor
```

**_Únicos valores aceptados para `sort`: name, yearsActive, impact, category. Únicos valores para `order`: asc, desc._**

Asimismo, se le pueden añadir parámetros para controlar cuántas compañías se muestran en una página y a partir de qué posición empezar a listar. Estas son:

```
.../company/list?from=inicio&limit=max-elementos
```

**_Únicamente valores numéricos enteros._**

Si no se coloca ninún parámetro adicional, estarán ordenadas por el orden en que fueron agregadas a la base de datos.

### Generación de Reportes

> Método: `GET`  
> Ruta: `.../company/report`  
> Acepta Parámetros Adicionales: Sí. Requirere token de Autenticación y Otros.

Para generar los reportes de Excel, se envía una solicitud con la misma estructura que del listado, solo que los parámetros de paginación no están disponibles. Si no se coloca ninún parámetro adicional, estarán ordenadas por el orden en que fueron agregadas a la base de datos. Una vez obtenia la respuesta, se descarga el documento de Excel generado.
