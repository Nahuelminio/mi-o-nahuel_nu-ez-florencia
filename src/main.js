/*
# Creando la aplicación de Vue
Para poder crear una aplicación de Vue necesitamos tres cosas:
1. Importar la función createApp del core de Vue.
2. Tener un componente que podamos usar como "componente raíz".
3. Tener algún elemento en el HTML donde poder montar la aplicación.


## Rutas para imports en npm
Si estamos trabajando con npm, generalmente las rutas de los imports se manejan con una
importante diferencia.
Por defecto, cualquier "ruta" que pongamos se va a buscar en la carpeta de [node_modules]
*salvo* que empieza con una carpeta (es decir, tenga dos o más segmentos la URL).

Por ejemplo, si ponemos:
  import { createApp } from "vue";

Automáticamente asume que "vue" es una carpeta que existe en [node_modules].
Por esta razón, si queremos usar un archivo local del proyecto que está en la misma carpeta
que este JS, no podemos escribir:
  import "bootstrap.min.css";

Porque lo va a buscar como un paquete de npm con ese nombre.

En su lugar, tenemos que poner rutas con al menos 2 segmentos.
Por ejemplo, empezando la ruta con:

  "/" => Buscar en la raíz del dominio.
  "./" => Buscar en el directorio en la que estamos.
  "../" => Buscar en el directorio padre del que estamos.
*/
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router/router.js";
const app = createApp(App);


app.use(router);


// Ahora podemos montar la aplicación en el div#app.
app.mount('#app');

// TODO: Sumar Vue Router al proyecto, crear las 4 pantallas, y agregar Tailwind al proyecto.