# Orven

Red social para opinar sobre relojes. Proyecto de la materia Clientes Web Mobile.

## Tecnologias

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- Supabase (Auth, Base de datos, Realtime y Storage)

## Requisitos

- Node.js
- Docker (para correr Supabase local)
- Supabase CLI

## Como levantar el proyecto

1. Instalar las dependencias:

```
npm install
```

2. Levantar Supabase local:

```
npx supabase start
```

3. Aplicar las migraciones y los datos de prueba:

```
npx supabase db reset
```

4. Levantar la app:

```
npm run dev
```

## Usuarios de prueba

- nahuel@test.com / 123456
- flor@test.com / 123456

## Funcionalidades

- Registro e inicio de sesion
- Editar perfil y cambiar la contrasena
- Subir foto de perfil
- Ver el perfil propio y el de otros usuarios
- Crear, editar y eliminar publicaciones
- Subir imagenes en las publicaciones
- Comentar las publicaciones
- Chat publico
- Publicaciones y comentarios en tiempo real
