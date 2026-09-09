# TesloShop Frontend

SPA en React + Vite + Tailwind para el backend NestJS de `teslo-shop`.

## Requisitos

- El backend corriendo en `http://localhost:3000` (con CORS habilitado).
- Node 18+.

## Uso

```bash
npm install
npm run dev
```

Configura la URL del backend en `.env` si es distinta:

```
VITE_API_URL=http://localhost:3000/api
```

## Funcionalidades

- Registro e inicio de sesión (JWT guardado en `localStorage`).
- Listado de productos con paginación.
- Alta y edición de productos con carga de imágenes (rol `admin`).
- Eliminación de productos (rol `admin`).
