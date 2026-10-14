/*
Los archivos [.config.js] son archivos de configuración de alguna herramienta.
Muchas lo usan, como Vite o Next.js o Tailwind, etc.

Siempre suelen tener que exportar como default un objeto de configuración.

Para el caso del plugin de Vue vamos a necesitar primero importar el plugin, y luego pasárselo al 
array de plugins de Vite.
*/
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue(), tailwindcss()],
}