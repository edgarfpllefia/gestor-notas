# 📘 Manual del Alumno: Guía Lineal del Proyecto

Bienvenido al proyecto **Gestión de Módulos y Tareas**.

Este documento es tu **hoja de ruta única**. Está diseñado para leerse de arriba a abajo. Te guiará desde "qué es esto" hasta "cómo escribo mi primera línea de código", pasando por la configuración de todas las herramientas.

---

## 🗺️ Fase 1: ¿Qué vamos a construir?

### 1.1 El Objetivo

Vamos a crear una aplicación web para que estudiantes de FP (como tú) puedan organizar su vida académica.
El problema actual es que es difícil llevar el seguimiento de las notas (trimestrales, finales) y las tareas de cada módulo.

### 1.2 ¿Qué hará la aplicación?

La aplicación tendrá dos caras:

1. **Parte Pública**: Cualquier persona podrá entrar y ver qué módulos (asignaturas) tienen los ciclos de DAW, DAM, ASIX, etc.
2. **Parte Privada (Estudiante)**: Si te registras, la app "copiará" los módulos de tu ciclo a tu perfil. A partir de ahí podrás:
   - Crear tareas para cada módulo (ej: "Entregar práctica PHP") y gestionar su **estado** (Pendiente, En Progreso, Completada).
   - Ponerte tus propias notas para calcular tu media.
   - Marcar módulos con un **estado** (Aprobado, Cursando, Pendiente) para ver tu progreso global.

> 🔗 **¿Quieres ver el detalle técnico de los datos?**
> Consulta el [Anexo de Arquitectura y Datos](./referencias/ARQUITECTURA.md) para ver cómo guardaremos la información (Usuarios, Módulos, Tareas, Estados).

---

## 🛠️ Fase 2: Tu Caja de Herramientas (Tecnologías)

Para construir esto, usaremos un stack moderno profesional. Hemos preparado guías detalladas para cada tecnología. **Léelas si no las conoces.**

### 2.1 El Frontend (Lo que se ve)

- **React 19**: La librería para crear interfaces.
  - 👉 [Guía Completa de React y Hooks](./teoria/4-REACT.md)
- **TypeScript**: JavaScript con tipos para evitar errores.
  - 👉 [Guía Completa de TypeScript](./teoria/3-TYPESCRIPT.md)
- **Tailwind CSS**: Estilos rápidos con clases utilitarias.
  - 👉 [Guía de Tailwind y UI](./teoria/5-UI-UX.md)
- **Shadcn/ui**: Componentes de alta calidad (Botones, Cards) que copiaremos.
  - 👉 [Qué es Shadcn/ui](./teoria/5-UI-UX.md#2-shadcnui-componentes-reutilizables)

### 2.2 La Metodología (Cómo trabajamos)

- **Agile & Scrum**: Trabajaremos en Sprints y usaremos un tablero Kanban.
  - 👉 [Guía de Metodología Agile](./teoria/1-METODOLOGIA.md)
- **Git & GitHub**: Flujo de trabajo profesional con ramas y Pull Requests.
  - 👉 [Guía de Git y Flujo de Trabajo](./teoria/2-GIT-FLUJO.md)

---

## ⚙️ Fase 3: Configuración del Entorno (Paso a Paso)

Es crucial seguir este orden lógico: primero clonamos el proyecto (la base) y luego configuramos la gestión (GitHub Projects).

### Paso 3.1: Preparar tu Ordenador (Clonar el Proyecto)

Lo primero es tener el código base en tu máquina.

1. Abre una terminal.
2. Clona el repositorio:
   ```bash
   git clone <url-de-tu-repo>
   cd tareas_modulos
   ```
3. Instala las librerías:
   ```bash
   npm install
   ```
4. Comprueba que funciona:
   ```bash
   npm run dev
   ```
   Si ves un link como `http://localhost:5173`, ¡todo está bien!

### Paso 3.2: Preparar GitHub (El Tablero de Mando)

Ahora que tienes el código, organicemos el trabajo en la nube.

1. Ve al repositorio del proyecto en GitHub.
2. Pestaña **Projects** -> **New Project**.
3. Selecciona **Board** (Tablero). Llámalo "Gestión Tareas - Sprint 1".
4. Crea las siguientes columnas si no existen:
   - **To Do** (Cosas por hacer)
   - **In Progress** (Estoy en ello)
   - **In Review** (Terminado, esperando revisión)
   - **Done** (Aprobado y cerrado)

### Paso 3.3: Crear las Tareas (Issues)

Tenemos los requisitos escritos en la carpeta `docs/historias/`. Vamos a convertirlos en tareas reales en tu tablero.

1. Abre `docs/historias/historia-01-planificacion-estructuras-datos.md` en tu editor local.
2. Ve a GitHub -> Pestaña **Issues** -> **New Issue**.
3. **Título**: "Historia 1: Planificación de Datos".
4. **Descripción**: Copia y pega todo el contenido del archivo `.md`.
5. En la barra lateral derecha:
   - **Assignees**: Tú (y tu pareja).
   - **Project**: Selecciona el proyecto que creaste en el paso 3.2.
6. Dale a **Submit**.
7. _Repite esto para la Historia 2 y la Historia 3._

---

## 🚀 Fase 4: Guía de Desarrollo (Tu Día a Día)

Así es como trabajarás cada día. No te saltes pasos. Consulta la [Guía de Git](./teoria/2-GIT-FLUJO.md) si te pierdes.

### 4.1 Elegir una Tarea

1. Ve a tu **GitHub Project**.
2. Coge la tarjeta **"Historia 1"** y muévela a la columna **In Progress**.
3. Esto avisa a tu equipo de que estás trabajando en ello.

### 4.2 Crear una Rama (Branch)

Nunca trabajes en la rama `main`. Crea una rama para tu tarea.

```bash
# 1. Asegúrate de estar actualizado
git checkout main
git pull origin main

# 2. Crea tu rama (ejemplo para Historia 1)
git checkout -b feature/historia-01-datos
```

### 4.3 Programar (El Ciclo de Trabajo)

Ahora desarrollas lo que pide la historia.

1. Lee los **Criterios de Aceptación** de la historia en GitHub.
2. Escribe código.
3. Ve marcando los checkboxes `[ ]` en el Issue de GitHub a medida que completas cosas.
4. **Guarda cambios (Commit)** frecuentemente:
   ```bash
   git add .
   git commit -m "feat: defino interfaz de usuario y módulo"
   ```

### 4.4 Terminar y Revisar (Pull Request)

Cuando hayas terminado todos los puntos de la historia:

1. Sube tu rama a la nube:
   ```bash
   git push origin feature/historia-01-datos
   ```
2. Ve a GitHub. Verás un botón verde **"Compare & pull request"**. Púlsalo.
3. Escribe en la descripción: `Closes #1` (donde #1 es el número de tu Issue). Esto cerrará la tarea automáticamente.
4. Mueve la tarjeta en el Project a **In Review**.
5. **Revisión**: Pide a tu compañero que mire el código. Si todo está bien, dadle al botón **Merge**.

### 4.5 Limpiar y Seguir

1. En tu terminal, vuelve a la rama principal y actualiza:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Borra tu rama antigua:
   ```bash
   git branch -d feature/historia-01-datos
   ```
3. Ve al **Paso 4.1** y repite con la siguiente historia.

---

## 📚 Anexos y Referencias

- 📄 **[Biblioteca de Teoría](./teoria/)**: Explicaciones profundas de todas las tecnologías.
- 🏗️ **[Anexo: Arquitectura y Datos](./referencias/ARQUITECTURA.md)**: Diagrama de datos.
- 📋 **[Historias de Usuario](./historias/README.md)**: La lista completa de tareas.

---

[🏠 Volver al Inicio del Repositorio](../README.md)
