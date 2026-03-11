# GestorTareas — Frontend

Aplicación web para la gestión de módulos y tareas de ciclos formativos de Formación Profesional. Desarrollada como proyecto de DAW2 por **Edgar** y **Arnau**.

---

## Índice

1. [Descripción general](#descripción-general)
2. [Tecnologías](#tecnologías)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Arquitectura](#arquitectura)
5. [Sistema de rutas](#sistema-de-rutas)
6. [Contextos globales](#contextos-globales)
7. [Capa API](#capa-api)
8. [Capa de datos (LocalStorage)](#capa-de-datos-localstorage)
9. [Tipos principales](#tipos-principales)
10. [Componentes](#componentes)
11. [Páginas](#páginas)
12. [Sistema de temas](#sistema-de-temas)
13. [Ciclos formativos disponibles](#ciclos-formativos-disponibles)
14. [Instalación y uso](#instalación-y-uso)

---

## Descripción general

GestorTareas permite a estudiantes de FP consultar los módulos de su ciclo formativo, gestionar sus tareas por módulo y llevar el control de notas. Los administradores pueden gestionar el catálogo de módulos.

**Funcionalidades principales:**

- Visualización pública de módulos por ciclo formativo (sin necesidad de login)
- Registro e inicio de sesión con roles diferenciados (`estudiante` / `admin`)
- Panel del estudiante: perfil, módulos matriculados, tareas por módulo, notas por evaluación
- CRUD completo de tareas con filtrado y ordenación
- Gestión de notas por trimestre, evaluación ordinaria y extraordinaria
- Panel de administrador: gestión del catálogo de módulos
- Diseño responsive (mobile-first) con menú hamburguesa en móvil
- Tema oscuro/claro persistente en LocalStorage

**Estado actual:** el frontend usa LocalStorage como capa de persistencia. La migración a un backend real (Node.js + PostgreSQL) está planificada — la capa `src/api/` ya está preparada para conectarse a él.

---

## Tecnologías

| Tecnología           | Versión  | Uso                       |
| -------------------- | -------- | ------------------------- |
| React                | 19       | UI                        |
| TypeScript / Vite    | ~5.9 / 7 | Lenguaje y bundler        |
| Tailwind CSS         | v4       | Estilos utilitarios       |
| Shadcn/ui + Radix UI | —        | Componentes base (Select) |
| React Router DOM     | v7       | Enrutamiento SPA          |
| Lucide React         | 0.562    | Iconografía               |
| DM Sans + Sora       | —        | Tipografía (Google Fonts) |

> **Nota:** el código dentro de los `.tsx` usa mayoritariamente sintaxis JavaScript (sin anotaciones de tipo). La migración completa a TypeScript está prevista para más adelante.

---

## Estructura del proyecto

```
tareas_modulos/
├── public/
├── src/
│   ├── api/                    # Clientes HTTP hacia el backend
│   │   ├── client.ts           # Fetch wrapper genérico (GET/POST/PUT/DELETE)
│   │   ├── auth.ts             # Login, register, logout, me
│   │   ├── modulos.ts          # CRUD de módulos
│   │   ├── moduloEstudiante.ts # Módulos del estudiante + notas
│   │   ├── tareas.ts           # CRUD de tareas
│   │   └── usuarios.ts         # Usuarios
│   │
│   ├── components/
│   │   ├── admin/              # Gestión de módulos (admin)
│   │   ├── auth/               # ProtectedRoute
│   │   ├── common/             # CicloSelector, ModuloList (compartidos)
│   │   ├── estudiante/         # Componentes de vista estudiante
│   │   ├── layout/             # Layout, Header, Footer, Navigation
│   │   ├── notas/              # GestionNotasModulo, NotaEvaluacion
│   │   ├── tareas/             # TareaList, TareaCard, TareaForm, diálogos
│   │   └── ui/                 # Componentes Shadcn/ui generados
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Estado global de autenticación
│   │   └── ThemeContext.tsx    # Estado global del tema dark/light
│   │
│   ├── data/
│   │   ├── constants.ts        # CICLOS_FORMATIVOS
│   │   ├── mockData.ts         # Datos iniciales para LocalStorage
│   │   ├── storage.ts          # Claves de LocalStorage (STORAGE_KEYS)
│   │   ├── utils.ts            # Utilidades de datos
│   │   └── repositories/       # Patrón repositorio sobre LocalStorage
│   │       ├── moduloRepository.ts
│   │       ├── moduloEstudianteRepository.ts
│   │       ├── tareaRepository.ts
│   │       └── usuarioRepository.ts
│   │
│   ├── pages/                  # Páginas / vistas principales
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript (Usuario, Modulo, Tarea…)
│   │
│   ├── App.tsx                 # Árbol de rutas principal
│   ├── main.tsx                # Punto de entrada, inicializa mock data
│   └── index.css               # Variables CSS de tema + estilos base
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Arquitectura

### Flujo de datos actual (LocalStorage)

```
Componente / Página
      │
      ▼
  Repository (src/data/repositories/)
      │  Lee/escribe directamente en LocalStorage
      ▼
  LocalStorage (navegador)
```

### Flujo de datos futuro (Backend)

```
Componente / Página
      │
      ▼
  API client (src/api/)
      │  fetch → http://localhost:3000/api
      ▼
  Backend Node.js + PostgreSQL
```

La capa `src/api/` ya existe y está lista. Cuando el backend esté disponible, los componentes sólo necesitarán sustituir las llamadas a los repositorios por las llamadas a `src/api/`.

### Patrón repositorio

Cada repositorio expone una interfaz uniforme sobre LocalStorage:

```ts
localStorageTareaRepo.getAll();
localStorageTareaRepo.getById(id);
localStorageTareaRepo.create(datos);
localStorageTareaRepo.update(id, datos);
localStorageTareaRepo.delete(id);
```

Los IDs se generan combinando `Date.now()` con un fragmento aleatorio de `Math.random().toString(36)`.

---

## Sistema de rutas

Definido en `src/App.tsx`. Todas las rutas se renderizan dentro del `<Layout />` que incluye Header y Footer.

| Ruta                                   | Componente            | Acceso            |
| -------------------------------------- | --------------------- | ----------------- |
| `/`                                    | `HomePage`            | Público           |
| `/login`                               | `LoginPage`           | Público           |
| `/register`                            | `RegisterPage`        | Público           |
| `/estudiante`                          | `EstudianteDashboard` | `rol: estudiante` |
| `/estudiante/modulos`                  | `ModulosEstudiante`   | `rol: estudiante` |
| `/estudiante/modulos/:moduloId/tareas` | `DetalleModulo`       | `rol: estudiante` |
| `/admin`                               | `AdminDashboard`      | `rol: admin`      |

### ProtectedRoute

`src/components/auth/ProtectedRoute.tsx` envuelve las rutas privadas. Comprueba:

1. Si está cargando la sesión → muestra spinner
2. Si no hay usuario → redirige a `/login`
3. Si el rol no coincide → redirige a `/`

---

## Contextos globales

### AuthContext (`src/contexts/AuthContext.tsx`)

Gestiona el estado de sesión en toda la app.

**Valores expuestos:**

| Valor                    | Tipo              | Descripción                       |
| ------------------------ | ----------------- | --------------------------------- |
| `user`                   | `object \| null`  | Usuario autenticado               |
| `loading`                | `boolean`         | Cargando sesión inicial           |
| `error`                  | `string \| null`  | Error del último intento de login |
| `login(email, password)` | `async → boolean` | Inicia sesión                     |
| `logout()`               | `async`           | Cierra sesión y limpia token      |

Al montar, lee `token` y `user` de LocalStorage para restaurar la sesión. Al hacer login, llama a `authApi.login()` y persiste el token y el usuario.

### ThemeContext (`src/contexts/ThemeContext.tsx`)

Gestiona el tema visual.

**Valores expuestos:**

| Valor          | Tipo                | Descripción         |
| -------------- | ------------------- | ------------------- |
| `tema`         | `"dark" \| "light"` | Tema activo         |
| `toggleTema()` | `() => void`        | Alterna entre temas |

Persiste el tema en LocalStorage y aplica el atributo `data-theme="light"` en `<html>` para activar las variables CSS del tema claro.

---

## Capa API

`src/api/client.ts` expone un wrapper sobre `fetch` que añade automáticamente el header `Authorization: Bearer <token>` si existe.

```ts
api.get("/modulos");
api.post("/auth/login", { email, password });
api.put("/tareas/123", { estado: "completada" });
api.delete("/tareas/123");
```

La URL base es `http://localhost:3000/api`.

### Módulos de API disponibles

**`auth.ts`**

- `login(email, password)` — guarda token y usuario en LocalStorage
- `register(datos)` — registro de nuevo usuario
- `logout()` — llama al endpoint y limpia LocalStorage
- `me()` — devuelve el usuario autenticado

**`modulos.ts`**

- `getAll(ciclo?, curso?)` — listado con filtros opcionales
- `getById(id)`
- `create(datos)`, `update(id, datos)`, `delete(id)`
- `getByCiclo(ciclo)`

**`moduloEstudiante.ts`**

- `getByEstudianteId(estudianteId)` — módulos matriculados de un estudiante
- `getDetalle(estudianteId, moduloId)` — detalle con notas y estado
- `update(estudianteId, moduloId, datos)` — actualiza estado/notas

**`tareas.ts`**

- `getByModuloEstudiante(estudianteId, moduloId)`
- `getById(id)`, `create(estudianteId, moduloId, datos)`
- `update(id, datos)`, `delete(id)`

---

## Capa de datos (LocalStorage)

### Claves de almacenamiento (`src/data/storage.ts`)

```ts
STORAGE_KEYS = {
  USUARIOS: "usuarios",
  MODULOS: "modulos",
  MODULOS_ESTUDIANTES: "modulosEstudiantes",
  TAREAS: "tareas",
};
```

### Inicialización

Al arrancar la app (`main.tsx`), si la clave `usuarios` no existe en LocalStorage, se ejecuta `inicializarDatosMock()` que carga datos de prueba predefinidos en `src/data/mockData.ts`.

### Repositorios

| Repositorio                  | Entidad          | Métodos destacados                                |
| ---------------------------- | ---------------- | ------------------------------------------------- |
| `moduloRepository`           | Módulo           | `getByCiclo`, `getByCicloYCurso`                  |
| `moduloEstudianteRepository` | ModuloEstudiante | `getByEstudianteId`, `deleteByModuloId`           |
| `tareaRepository`            | Tarea            | `getByModuloId`, `getByEstudianteId`              |
| `usuarioRepository`          | Usuario          | `getByEmail`, `getByRol`, `getEstudiantesByCiclo` |

---

## Tipos principales

Definidos en `src/types/index.ts`.

```ts
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  cicloFormativo: string; // "DAW", "SMR"…
  rol: "estudiante" | "administrador";
}

interface Modulo {
  id: string;
  nombre: string;
  curso: 1 | 2;
  cicloFormativo: string;
}

interface ModuloEstudiante {
  id: string;
  moduloId: string;
  estudianteId: string;
  estado: "aprobado" | "cursando" | "no-cursa" | "pendiente";
  notas: {
    trimestre1?: number;
    trimestre2?: number;
    trimestre3?: number;
    ordinaria?: number;
    extraordinaria?: number;
  };
}

interface Tarea {
  id: string;
  moduloId: string;
  estudianteId: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaVencimiento?: string;
  estado: "pendiente" | "en-progreso" | "completada";
  nota?: number;
}
```

---

## Componentes

### Layout (`src/components/layout/`)

- **`Layout.tsx`** — contenedor raíz con Header, `<Outlet />` y Footer
- **`Header.tsx`** — barra de navegación sticky. Muestra enlaces según el rol del usuario. En móvil incluye botón de tema y menú hamburguesa con desplegable
- **`Footer.tsx`** — pie de página
- **`Navigation.tsx`** — navegación auxiliar

### Auth (`src/components/auth/`)

- **`ProtectedRoute.tsx`** — HOC para rutas privadas con comprobación de rol

### Common (`src/components/common/`)

- **`CicloSelector`** — selector de ciclo formativo (usado en HomePage)
- **`ModuloList`** — listado de tarjetas de módulos (uso público)

### Tareas (`src/components/tareas/`)

| Componente            | Descripción                                 |
| --------------------- | ------------------------------------------- |
| `TareaList`           | Lista las tareas recibidas por props        |
| `TareaCard`           | Tarjeta individual de tarea con acciones    |
| `TareaForm`           | Formulario de creación/edición de tarea     |
| `FormDialog`          | Modal genérico que envuelve el formulario   |
| `DeleteConfirmDialog` | Modal de confirmación de borrado            |
| `FiltroTareas`        | Filtros por estado y rango de fechas        |
| `OrdenacionTareas`    | Ordenación por título, fecha, estado o nota |
| `EstadoSelector`      | Selector de estado de tarea                 |

### Notas (`src/components/notas/`)

- **`GestionNotasModulo`** — panel completo de notas de un módulo (trimestres, ordinaria, extraordinaria) y selector de estado del módulo
- **`NotaEvaluacion`** — campo individual de nota con input y label
- **`EstadoModuloSelector`** — selector del estado del módulo para el estudiante

### Admin (`src/components/admin/`)

- **`GestionModulos`** — gestión completa del catálogo de módulos
- **`ListaModulosAdmin`** — tabla de módulos con acciones
- **`ModuloForm`** — formulario de creación/edición de módulo

---

## Páginas

### `HomePage`

Página pública. Permite seleccionar un ciclo formativo con `CicloSelector` y muestra la lista de módulos correspondiente usando el repositorio de módulos directamente.

### `LoginPage`

Formulario de login. Usa `AuthContext.login()`. Redirige a `/estudiante` o `/admin` según el rol.

### `RegisterPage`

Registro de nuevo usuario. Llama a `authApi.register()`.

### `EstudianteDashboard`

Panel del estudiante. Muestra los datos del perfil (nombre, email, ciclo, rol) y un botón para acceder a sus módulos.

### `ModulosEstudiante`

Lista los módulos en los que está matriculado el estudiante autenticado, con estado y acceso al detalle.

### `DetalleModulo`

Vista principal del estudiante. Carga el módulo, las tareas y los datos de `ModuloEstudiante` en paralelo. Incluye:

- Info del módulo (código, curso, horas)
- `GestionNotasModulo` — notas y estado
- CRUD completo de tareas con filtros y ordenación
- Lógica de filtrado (por estado y rango de fechas) y ordenación (por título, fecha de creación, fecha de vencimiento, estado, nota)

### `AdminDashboard`

Panel de administrador. Incluye `GestionModulos` para el CRUD del catálogo.

---

## Sistema de temas

Definido en `src/index.css` mediante variables CSS personalizadas.

### Variables disponibles

| Variable           | Dark      | Light     | Uso                      |
| ------------------ | --------- | --------- | ------------------------ |
| `--bg-base`        | `#161b2e` | `#f4f6fb` | Fondo de la página       |
| `--bg-surface`     | `#272d45` | `#ffffff` | Tarjetas, header         |
| `--bg-surface-2`   | `#2e3554` | `#e8edf5` | Elementos secundarios    |
| `--border`         | `#3a4166` | `#d1d9e6` | Bordes                   |
| `--accent`         | `#3b82f6` | `#2563eb` | Botones, enlaces activos |
| `--accent-hover`   | `#60a5fa` | `#1d4ed8` | Hover de accent          |
| `--text-primary`   | `#f1f5f9` | `#0f172a` | Texto principal          |
| `--text-secondary` | `#94a3b8` | `#475569` | Texto secundario         |

El tema activo se controla con el atributo `data-theme="light"` en `<html>`. Sin él, se aplica el dark por defecto.

**Tipografía:**

- Cuerpo: `DM Sans`
- Títulos (`h1`–`h4`) y elementos de marca: `Sora`

---

## Ciclos formativos disponibles

Definidos en `src/data/constants.ts`.

| ID    | Nombre                                 | Grado    |
| ----- | -------------------------------------- | -------- |
| `DAW` | Desarrollo de Aplicaciones Web         | Superior |
| `ARI` | Automatización y Robótica Industrial   | Superior |
| `SMR` | Sistemas Microinformáticos y Redes     | Medio    |
| `IEA` | Instalaciones Eléctricas y Automáticas | Medio    |

---

## Instalación y uso

### Requisitos

- Node.js 18+
- npm

### Pasos

```bash
# 1. Instalar dependencias
cd tareas_modulos
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

Al abrirla por primera vez, se cargan automáticamente datos de prueba en LocalStorage (usuarios, módulos, relaciones y tareas de ejemplo).

### Scripts disponibles

| Script            | Descripción                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR          |
| `npm run build`   | Build de producción (TypeScript + Vite) |
| `npm run preview` | Previsualizar el build                  |
| `npm run lint`    | Análisis estático con ESLint            |

---

---

## Despliegue en producción

El proyecto está desplegado con la siguiente arquitectura:

| Capa | Servicio | URL |
| --- | --- | --- |
| Frontend | Vercel | https://gestor-notas-sigma.vercel.app |
| Backend | Railway | https://backend-proyecto-arnau-edgar-production.up.railway.app |
| Base de datos | Supabase | Proyecto `awcynsqyelghouhielxj` |

### Frontend — Vercel

1. Importar el repo desde GitHub en [vercel.com](https://vercel.com)
2. Vercel detecta Vite automáticamente
3. Añadir la variable de entorno:
   - `VITE_API_URL` = `https://backend-proyecto-arnau-edgar-production.up.railway.app/api`
4. Hacer deploy

> El script de build usa solo `vite build` (sin `tsc -b`) para evitar errores de TypeScript estricto durante el build de producción.

### Backend — Railway

1. Importar el repo del backend desde GitHub en [railway.app](https://railway.app)
2. Railway detecta Node.js y usa `npm start` automáticamente
3. En **Settings → Networking → Generate Domain**, especificar el puerto `8080`
4. Añadir las variables de entorno en la pestaña **Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Railway hace redeploy automático en cada push a `main`

> El servidor escucha en el puerto que Railway asigna dinámicamente (`process.env.PORT`). Railway expone el servicio externamente en el puerto 8080.

### CORS

El backend está configurado para aceptar peticiones desde:
- `https://gestor-notas-sigma.vercel.app` (producción)
- Cualquier subdominio de `*.vercel.app` (previews de Vercel)
- `http://localhost:5173` (desarrollo local)

### Variables de entorno

**Backend (`api/.env`)** — no subir al repo:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
PORT=3000
```

**Frontend** — configurar en Vercel (no hace falta archivo local):
```
VITE_API_URL=https://backend-proyecto-arnau-edgar-production.up.railway.app/api
```

---

> **Proyecto académico** — DAW2 · IES [Centro] · Curso 2024/2025
