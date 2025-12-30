# Historia 2: Configuración del Entorno Básico

## Descripción

**Como** desarrollador  
**Quiero** configurar el entorno básico de la aplicación (router, layout, componentes base)  
**Para** tener la estructura fundamental antes de desarrollar funcionalidades

## Criterios de Aceptación

- Debe estar configurado el enrutador (React Router)
- Debe existir un layout básico con header y navegación
- Debe haber componentes base reutilizables
- Debe estar configurado el contexto de autenticación (estructura básica)

## Tareas de Implementación

### Instalación de Dependencias
- [ X ] Instalar React Router DOM:
  ```bash
  npm install react-router-dom
  ```
- [ X ] Instalar tipos de React Router (si es necesario):
  ```bash
  npm install -D @types/react-router-dom
  ```
- [ X ] Verificar que Tailwind CSS está instalado
- [ X ] Verificar que Shadcn/ui está configurado

### Configuración del Router
- [ X ] Crear archivo `src/App.tsx` o `src/router.tsx`
- [ ] Configurar rutas básicas:
  - [ ] `/` - Página principal (público)
  - [ ] `/login` - Login (público)
  - [ ] `/register` - Registro (público)
  - [ ] `/estudiante/*` - Rutas protegidas de estudiante
  - [ ] `/admin/*` - Rutas protegidas de administrador
- [ X ] Crear componente `Router` o configurar en `App.tsx`
- [ X ] Configurar navegación básica

### Estructura de Layout
- [ X ] Crear componente `Layout` base
- [ X ] Crear componente `Header`
- [ X ] Crear componente `Footer` (opcional)
- [ X ] Crear componente `Main` o `Container` para contenido
- [ X ] Aplicar estilos básicos con Tailwind CSS

### Componente Header
- [ X ] Crear estructura básica del header:
  - [ X ] Logo o título de la aplicación
  - [ X ] Menú de navegación
  - [ X ] Área de usuario (login/logout)
- [ X ] Implementar menú de navegación:
  - [ X ] Enlace a página principal
  - [ X ] Enlace a login (si no está autenticado)
  - [ X ] Enlace a registro (si no está autenticado)
  - [ X ] Menú de estudiante (si está autenticado como estudiante)
  - [ X ] Menú de administrador (si está autenticado como admin)
- [ X ] Aplicar estilos con Tailwind CSS
- [ X ] Hacer responsive el header

### Componente de Navegación
- [ X ] Crear componente `Navigation` o `Nav`
- [X ] Implementar enlaces de navegación
- [X  ] Añadir indicador de página activa
- [ X] Aplicar estilos

### Contexto de Autenticación (Estructura Básica)
- [ X ] Crear archivo `src/contexts/AuthContext.tsx`
- [ X ] Crear contexto de autenticación:
  - [ X ] Estado de usuario (null o Usuario)
  - [ X ] Función de login (estructura básica)
  - [ X ] Función de logout (estructura básica)
- [X ] Crear componente `AuthProvider`
- [x ] Crear hook `useAuth` para usar el contexto
- [X ] Envolver la app con `AuthProvider`

### Componente ProtectedRoute
- [ X ] Crear componente `ProtectedRoute`
- [ X ] Implementar verificación de autenticación
- [ X ] Redirigir a login si no está autenticado
- [ X ] Verificar rol si es necesario (estudiante/admin)
- [ X ] Aplicar a rutas protegidas

### Páginas Básicas
- [ X ] Crear carpeta `src/pages/` o `src/views/`
- [X  ] Crear página `HomePage` (placeholder básico)
- [X ] Crear página `LoginPage` (estructura básica, sin funcionalidad)
- [X ] Crear página `RegisterPage` (estructura básica, sin funcionalidad)
- [ X] Crear página `EstudianteDashboard` (placeholder)
- [X ] Crear página `AdminDashboard` (placeholder)

### Componentes Base Reutilizables
- [ X ] Crear componente `Container` o `PageContainer`:
  - [ X ] Wrapper con estilos consistentes
  - [ X ] Máximo ancho, padding, etc.
- [ X ] Crear componente `Button` (si no se usa Shadcn/ui)
- [ X ] Crear componente `Card` básico (si no se usa Shadcn/ui)
- [ X ] Crear componente `Loading` o `Spinner`
- [ X ] Crear componente `ErrorMessage` para errores

### Configuración de Rutas
- [ X ] Configurar rutas públicas:
  - [ X ] `/` → HomePage
  - [ X ] `/login` → LoginPage
  - [ X ] `/register` → RegisterPage
- [ X ] Configurar rutas protegidas de estudiante:
  - [ X ] `/estudiante` → EstudianteDashboard
  - [ X ] `/estudiante/modulos` → (se implementará después)
- [ X ] Configurar rutas protegidas de administrador:
  - [ X ] `/admin` → AdminDashboard
  - [ X ] `/admin/modulos` → (se implementará después)

### Estilos Globales
- [ X ] Configurar estilos base en `src/index.css`
- [ X ] Añadir variables CSS si es necesario
- [ X ] Configurar fuentes
- [ X ] Configurar colores base
- [ X] Asegurar que Tailwind está correctamente configurado

### Navegación Programática
- [ X ] Implementar función de navegación usando `useNavigate`
- [ X ] Crear helper para navegación si es necesario
- [  X] Implementar redirecciones después de login/logout

### Testing y Validación
- [ X ] Probar que el router funciona correctamente
- [ X ] Probar navegación entre páginas
- [ X ] Probar que las rutas protegidas redirigen correctamente
- [ X ] Verificar que el header se muestra en todas las páginas
- [ X ] Verificar responsive design
- [ X ] Revisar código con la pareja

### Documentación
- [ X ] Documentar estructura de rutas
- [ X ] Documentar componentes base creados
- [ X ] Documentar el contexto de autenticación
- [ X ] Actualizar README si es necesario
- [ X ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Usar React Router v6 (última versión)
- El contexto de autenticación puede ser básico inicialmente, se completará en Historia 5
- Los componentes base pueden ser simples, se mejorarán con el tiempo
- Considerar usar Shadcn/ui para componentes base si está configurado

## Estructura de Archivos Sugerida

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx (opcional)
│   ├── common/
│   │   ├── Container.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   └── auth/
│       └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── EstudianteDashboard.tsx
│   └── AdminDashboard.tsx
└── App.tsx (configuración de rutas)
```

## Estimación

**Tiempo estimado**: 5-6 horas (M)

## Prioridad

**CRÍTICA** - Debe hacerse antes de las historias de funcionalidades

## Dependencias

- Historia 1: Planificación de Estructuras de Datos (para tipos básicos)

## Notas Adicionales

- Esta historia debe completarse después de la Historia 1
- Es la base para todas las demás historias
- Los componentes pueden ser básicos, se mejorarán con el tiempo
- El contexto de autenticación se completará en Historia 5




---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
