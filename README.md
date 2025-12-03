# Gestión de Módulos y Tareas - Ciclos Formativos

Aplicación web desarrollada con React y TypeScript para que estudiantes visualicen y gestionen módulos y tareas de ciclos formativos según el nuevo currículum de Cataluña.

## 📋 Descripción

Esta aplicación permite a los estudiantes:

- Visualizar los módulos correspondientes a su ciclo formativo
- Gestionar tareas asociadas a cada módulo
- Realizar seguimiento de notas y estados de tareas
- Filtrar y ordenar información según diferentes criterios

### Ciclos Formativos Soportados

- Desarrollo de Aplicaciones Web (Grado Superior)
- Automatización Industrial y Robótica (Grado Superior)
- Sistemas Microinformáticos (Grado Medio)
- Instalaciones Eléctricas y Automáticas (Grado Medio)

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones

## 📦 Instalación Rápida

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd tareas_modulos
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🛠️ Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 📁 Estructura del Proyecto

```
tareas_modulos/
├── public/          # Archivos estáticos
├── src/
│   ├── assets/     # Recursos (imágenes, iconos, etc.)
│   ├── components/  # Componentes React
│   ├── App.tsx      # Componente principal
│   └── main.tsx     # Punto de entrada
├── index.html
├── package.json
└── vite.config.ts
```

## 📚 Documentación

### Documentación Completa

Para una guía detallada sobre el desarrollo del proyecto, metodología Agile, configuración y conceptos técnicos, consulta la [documentación completa](./docs/README.md) o el [Manual del Alumno](./docs/MANUAL_ALUMNO.md).

La documentación incluye:

- Especificaciones detalladas del proyecto
- Casos de uso
- Configuración del entorno de desarrollo
- Guía de Git y GitHub
- Metodología Agile y Scrum
- Conceptos clave de React y TypeScript
- Arquitectura de datos y persistencia
- Y mucho más...

### Historias de Usuario

Las historias de usuario detalladas con tareas específicas se encuentran en la carpeta [`docs/historias/`](./docs/historias/).

El proyecto consta de **12 historias de usuario** numeradas del 1 al 12:

- **Historias 1-2**: Configuración inicial (CRÍTICAS - hacer primero)
- **Historias 3-12**: Funcionalidades de la aplicación

Cada historia incluye:

- Descripción y criterios de aceptación
- Lista detallada de tareas con checkboxes para seguimiento
- Notas técnicas y estimaciones
- Prioridad

Estas historias están diseñadas para facilitar la creación de Issues en GitHub Projects y el seguimiento del progreso del proyecto. Consulta el [README de historias](./docs/historias/README.md) para ver la lista completa.

## 🎯 Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: Shadcn/ui
- **Backend** (Fase 2): Express + MongoDB

## 👥 Desarrollo en Parejas

Este proyecto está diseñado para ser desarrollado en parejas usando metodología Agile. Consulta la documentación para más detalles sobre el proceso de desarrollo colaborativo.

## 📝 Licencia

Este proyecto es parte de un curso de desarrollo de aplicaciones web.
