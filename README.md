# 🛍️ Teslo Shop Frontend

Aplicación React moderna para un e-commerce de productos electrónicos. Parte del proyecto fullstack **teslo-shop** que demuestra buenas prácticas en desarrollo frontend y arquitectura de aplicaciones web.

## ✨ Características

- **Autenticación JWT** - Sistema robusto de login/registro con validación
- **Carrito de compras** - Gestión de carrito persistente con localStorage
- **Panel de administrador** - Crear, editar y eliminar productos
- **Paginación** - Carga eficiente de productos (10 por página)
- **Diseño responsivo** - UI moderna con Tailwind CSS
- **Tests automatizados** - Cobertura de componentes y lógica de negocio
- **Git hooks** - Validaciones automáticas antes de commits
- **Gestión de estado** - Zustand para store ligero y eficiente

## 🚀 Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | React | 19.2.8 |
| **Router** | React Router | 7.18.3 |
| **State Management** | Zustand | 5.0.15 |
| **Build Tool** | Vite | 8.2.2 |
| **Styling** | Tailwind CSS | 4.3.3 |
| **HTTP Client** | Axios | 1.20.0 |
| **Forms** | React Hook Form | 7.87.0 |
| **Notifications** | React Hot Toast | 2.6.0 |
| **Testing** | Vitest | 1.6.0 |
| **Testing Library** | @testing-library/react | 15.0.7 |
| **Linting** | oxlint | 1.79.0 |
| **Git Hooks** | Husky | 9.1.7 |

## 📦 Instalación

### Requisitos previos
- Node.js 18+ o npm 9+
- Git

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/juale86/teslo-shop-frontend.git
cd teslo-shop-frontend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicializa Husky (git hooks)**
```bash
npm run prepare
```

4. **Configura las variables de entorno**

Crea un archivo `.env.local` en la raíz:
```env
VITE_API_URL=http://localhost:3000/api
```

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

El app estará disponible en `http://localhost:5173`

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo con Vite

# Build
npm run build            # Compila para producción
npm run preview          # Preview del build

# Testing
npm run test             # Ejecuta tests en modo watch
npm run test:coverage    # Genera reporte de cobertura
npm run test:ui          # Dashboard visual de tests

# Linting
npm run lint             # Ejecuta oxlint
npm run lint:fix         # Corrige errores de linting automáticamente

# Preparación
npm run prepare          # Instala Husky hooks (se ejecuta automáticamente en npm install)
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── Navbar.jsx          # Barra de navegación
│   ├── ProductCard.jsx     # Tarjeta de producto
│   └── ProtectedRoute.jsx  # Rutas protegidas por autenticación
├── pages/                  # Páginas principales
│   ├── ProductsPage.jsx    # Listado de productos
│   ├── CartPage.jsx        # Carrito de compras
│   ├── LoginPage.jsx       # Formulario de login
│   ├── RegisterPage.jsx    # Formulario de registro
│   ├── ProductFormPage.jsx # Crear/editar producto (admin)
│   └── NotFoundPage.jsx    # Página 404
├── store/                  # Estado global (Zustand)
│   ├── authStore.js        # Autenticación y usuario
│   └── cartStore.js        # Carrito de compras
├── api/                    # Configuración de cliente HTTP
│   └── tesloApi.js         # Instancia de Axios
├── App.jsx                 # Componente raíz y rutas
├── main.jsx                # Punto de entrada
├── index.css               # Estilos globales
└── __tests__/              # Tests unitarios
    ├── cartStore.test.js
    └── ProductCard.test.jsx

Archivos de configuración:
├── vite.config.js          # Configuración de Vite
├── vitest.config.js        # Configuración de Vitest
├── vitest.setup.js         # Setup global de tests
├── tailwind.config.js       # Configuración de Tailwind
└── .husky/                 # Git hooks
    └── pre-commit          # Hook que ejecuta lint + tests
```

## 🧪 Testing

### Ejecutar tests

```bash
# Una sola ejecución
npm run test

# Modo watch (se re-ejecuta al cambiar archivos)
npm run test -- --watch

# Con UI interactiva
npm run test:ui

# Con reporte de cobertura
npm run test:coverage
```

### Cobertura de tests

Actualmente contamos con tests para:
- ✅ **cartStore.js** - 9 test cases
  - Agregar/remover items
  - Fusionar cantidades
  - Calcular totales
  - Limpiar carrito
  
- ✅ **ProductCard.jsx** - 5 test cases
  - Renderizar información de producto
  - Botones de admin vs usuario normal
  - Mostrar imágenes y placeholders

### Agregar nuevos tests

Crea un archivo `.test.js` o `.test.jsx` en `src/__tests__/`:

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MiComponente } from '../src/components/MiComponente'

describe('MiComponente', () => {
  it('debe renderizar correctamente', () => {
    render(<MiComponente />)
    expect(screen.getByText('texto esperado')).toBeInTheDocument()
  })
})
```

## 🔐 Autenticación

### Flujo de login

1. Usuario ingresa credenciales en `/login`
2. Se envía POST a `/api/auth/login`
3. Backend retorna `access_token` y datos del usuario
4. Token se guarda en `localStorage` con key `auth-token`
5. El usuario es redirigido a `/`

### Flujo de protección de rutas

- Rutas públicas: `/`, `/login`, `/register`, `/products`
- Rutas privadas: `/cart`
- Rutas de admin: `/products/new`, `/products/:id/edit`

La autenticación se verifica en componente `ProtectedRoute.jsx`

## 🛒 Carrito de Compras

### Características

- Persistencia en `localStorage`
- Fusión automática de cantidades (mismo producto)
- Cálculo automático de subtotal y total
- Validación de stock

### API del Store

```javascript
import { useCartStore } from './store/cartStore'

// Agregar item
const addItem = useCartStore((state) => state.addItem)
addItem(product, quantity)

// Remover item
const removeItem = useCartStore((state) => state.removeItem)
removeItem(productId)

// Actualizar cantidad
const updateQuantity = useCartStore((state) => state.updateQuantity)
updateQuantity(productId, newQuantity)

// Obtener totales
const getTotalPrice = useCartStore((state) => state.getTotalPrice)
const getTotalItems = useCartStore((state) => state.getTotalItems)

// Limpiar carrito
const clearCart = useCartStore((state) => state.clearCart)
```

## 🔍 Linting y Formateo

El proyecto usa **oxlint** para análisis estático de código.

```bash
# Ver errores
npm run lint

# Intentar corregir automáticamente
npm run lint:fix
```

Los errores de linting bloquean los commits gracias a Husky.

## 🪝 Git Hooks

Antes de cada `git commit`, se ejecutan automáticamente:

1. **lint-staged** - Linting en archivos modificados
2. **vitest** - Tests automatizados

Si alguno falla, el commit se cancela. Soluciona los problemas y vuelve a intentar.

### Bypass de hooks (no recomendado)

```bash
git commit --no-verify
```

## 📱 Responsividad

El proyecto es completamente responsive:

- **Mobile** (< 640px) - 1 columna
- **Tablet** (640px - 1024px) - 2-3 columnas
- **Desktop** (> 1024px) - 5 columnas

## 🚀 Deployment

### Build para producción

```bash
npm run build
```

Genera carpeta `dist/` lista para desplegar.

### Variables de entorno para producción

```env
VITE_API_URL=https://api.tudominio.com
```

### Opciones de deployment

- **Vercel** - Integración con Git automática
- **Netlify** - Deploy desde rama `main`
- **AWS S3 + CloudFront** - Control completo
- **Render** - Companion del backend teslo-shop

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mi-feature`)
3. Commit con mensaje descriptivo (`git commit -m 'feat: agrego nueva feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

### Convención de commits

```
feat:     Nueva característica
fix:      Corrección de bug
docs:     Cambios en documentación
style:    Cambios en formato (linting, etc)
test:     Agregar o actualizar tests
refactor: Refactoring de código
chore:    Cambios en dependencias/config
```

## 🐛 Troubleshooting

### Los tests fallan localmente pero pasan en CI

Asegúrate de tener Node.js 18+ instalado.

```bash
node --version  # Debe ser v18.0.0 o superior
```

### El servidor de desarrollo no inicia

Verifica que el puerto 5173 esté disponible:

```bash
# En Windows
netstat -ano | findstr :5173

# En Mac/Linux
lsof -i :5173
```

### Git hooks no se ejecutan

Reinicializa Husky:

```bash
npm run prepare
```

### CORS errors contra el backend

Asegúrate de que:
1. El backend está corriendo en `http://localhost:3000`
2. El backend tiene CORS habilitado
3. La URL en `.env.local` es correcta

## 📄 Licencia

MIT

## 👨‍💻 Autor

Juan Manuel Alemán - [@juale86](https://github.com/juale86)

## 📚 Documentación adicional

- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Documentación de Zustand](https://github.com/pmndrs/zustand)
- [Documentación de Vitest](https://vitest.dev)

## 🔗 Proyectos relacionados

- [teslo-shop (Backend)](https://github.com/juale86/teslo-shop) - API REST con NestJS
- [teslo-shop-docs](https://github.com/juale86/teslo-shop-docs) - Documentación completa del proyecto
