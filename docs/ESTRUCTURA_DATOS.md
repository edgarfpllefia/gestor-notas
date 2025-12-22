# Estructura de Datos

## 📋 Descripción General

Este proyecto gestiona información de un sistema educativo con cuatro entidades principales almacenadas en LocalStorage.

---

## 🗂️ Entidades

### 1. Usuario

Representa tanto a profesores como a estudiantes del sistema.

**Campos:**

| Campo          | Tipo   | Descripción                                            | Obligatorio |
| -------------- | ------ | ------------------------------------------------------ | ----------- |
| `id`           | string | Identificador único del usuario                        | Sí          |
| `nombre`       | string | Nombre completo del usuario                            | Sí          |
| `email`        | string | Correo electrónico                                     | Sí          |
| `rol`          | string | Rol del usuario: `"profesor"` o `"estudiante"`         | Sí          |
| `ciclo`        | string | Ciclo formativo (solo estudiantes): DAW, ARI, SMR, IEA | No          |
| `especialidad` | string | Especialidad del profesor (solo profesores)            | No          |

**Ejemplo:**

```json
{
  "id": "4",
  "nombre": "Edgar Fernández García",
  "email": "edgar.fernandez@alumno.es",
  "rol": "estudiante",
  "ciclo": "DAW"
}
```

---

### 2. Módulo

Representa las asignaturas de los diferentes ciclos formativos.

**Campos:**

| Campo         | Tipo   | Descripción                                | Obligatorio |
| ------------- | ------ | ------------------------------------------ | ----------- |
| `id`          | string | Identificador único del módulo             | Sí          |
| `codigo`      | string | Código oficial del módulo (ej: "0483")     | Sí          |
| `nombre`      | string | Nombre del módulo                          | Sí          |
| `ciclo`       | string | Ciclo al que pertenece: DAW, ARI, SMR, IEA | Sí          |
| `curso`       | number | Curso (1 o 2)                              | Sí          |
| `horas`       | number | Horas totales del módulo                   | Sí          |
| `profesorId`  | string | ID del profesor que imparte el módulo      | Sí          |
| `descripcion` | string | Descripción breve del módulo               | Sí          |

**Ejemplo:**

```json
{
  "id": "5",
  "codigo": "0373",
  "nombre": "Desarrollo Web en Entorno Cliente",
  "ciclo": "DAW",
  "curso": 2,
  "horas": 140,
  "profesorId": "1",
  "descripcion": "JavaScript, frameworks frontend y UX"
}
```

---

### 3. ModuloEstudiante

Tabla de relación que conecta estudiantes con los módulos en los que están inscritos.

**Campos:**

| Campo              | Tipo   | Descripción                                | Obligatorio |
| ------------------ | ------ | ------------------------------------------ | ----------- |
| `id`               | string | Identificador único de la inscripción      | Sí          |
| `estudianteId`     | string | ID del estudiante                          | Sí          |
| `moduloId`         | string | ID del módulo                              | Sí          |
| `fechaInscripcion` | string | Fecha de inscripción (formato: YYYY-MM-DD) | Sí          |

**Ejemplo:**

```json
{
  "id": "1",
  "estudianteId": "4",
  "moduloId": "5",
  "fechaInscripcion": "2024-09-01"
}
```

---

### 4. Tarea

Representa las tareas asignadas a los estudiantes en sus módulos.

**Campos:**

| Campo           | Tipo   | Descripción                                            | Obligatorio |
| --------------- | ------ | ------------------------------------------------------ | ----------- |
| `id`            | string | Identificador único de la tarea                        | Sí          |
| `moduloId`      | string | ID del módulo al que pertenece                         | Sí          |
| `estudianteId`  | string | ID del estudiante asignado                             | Sí          |
| `titulo`        | string | Título de la tarea                                     | Sí          |
| `descripcion`   | string | Descripción detallada                                  | Sí          |
| `fechaCreacion` | string | Fecha de creación (YYYY-MM-DD)                         | Sí          |
| `fechaEntrega`  | string | Fecha límite de entrega (YYYY-MM-DD)                   | Sí          |
| `estado`        | string | Estado: `"pendiente"`, `"en-progreso"`, `"completada"` | Sí          |
| `prioridad`     | string | Prioridad: `"alta"`, `"media"`, `"baja"`               | Sí          |

**Ejemplo:**

```json
{
  "id": "1",
  "moduloId": "5",
  "estudianteId": "4",
  "titulo": "Crear componente React reutilizable",
  "descripcion": "Desarrollar un componente de tarjeta (card) en React...",
  "fechaCreacion": "2025-01-05",
  "fechaEntrega": "2025-01-15",
  "estado": "pendiente",
  "prioridad": "alta"
}
```

---

## 🔗 Relaciones entre Entidades

### Diagrama de Relaciones

```
Usuario (Profesor)
    |
    | 1:N (Un profesor imparte varios módulos)
    |
    ↓
Módulo ←──────────────────┐
    |                     |
    | N:M                 |
    | (mediante           |
    |  ModuloEstudiante)  |
    ↓                     |
Usuario (Estudiante)      |
    |                     |
    | 1:N                 | N:1
    |                     |
    ↓                     |
Tarea ────────────────────┘
```

### Relaciones Detalladas

#### 1. **Usuario (Profesor) → Módulo** (1:N)

- Un **profesor** puede impartir **varios módulos**
- Un **módulo** es impartido por **un solo profesor**
- **Campo de relación:** `modulo.profesorId` → `usuario.id`

**Ejemplo:**

```json
// Profesor
{ "id": "1", "nombre": "María García", "rol": "profesor" }

// Módulos que imparte
{ "id": "5", "profesorId": "1", "nombre": "Desarrollo Web Cliente" }
{ "id": "6", "profesorId": "1", "nombre": "Desarrollo Web Servidor" }
```

#### 2. **Usuario (Estudiante) ↔ Módulo** (N:M)

- Un **estudiante** puede estar inscrito en **varios módulos**
- Un **módulo** puede tener **varios estudiantes**
- **Tabla intermedia:** `ModuloEstudiante`
- **Campos de relación:**
  - `moduloEstudiante.estudianteId` → `usuario.id`
  - `moduloEstudiante.moduloId` → `modulo.id`

**Ejemplo:**

```json
// Estudiante
{ "id": "4", "nombre": "Edgar", "rol": "estudiante" }

// Inscripciones
{ "id": "1", "estudianteId": "4", "moduloId": "5" }
{ "id": "2", "estudianteId": "4", "moduloId": "6" }

// Módulos en los que está inscrito
{ "id": "5", "nombre": "Desarrollo Web Cliente" }
{ "id": "6", "nombre": "Desarrollo Web Servidor" }
```

#### 3. **Módulo → Tarea** (1:N)

- Un **módulo** puede tener **varias tareas**
- Una **tarea** pertenece a **un solo módulo**
- **Campo de relación:** `tarea.moduloId` → `modulo.id`

**Ejemplo:**

```json
// Módulo
{ "id": "5", "nombre": "Desarrollo Web Cliente" }

// Tareas del módulo
{ "id": "1", "moduloId": "5", "titulo": "Crear componente React" }
{ "id": "2", "moduloId": "5", "titulo": "Gestión de estado" }
```

#### 4. **Usuario (Estudiante) → Tarea** (1:N)

- Un **estudiante** puede tener **varias tareas**
- Una **tarea** está asignada a **un solo estudiante**
- **Campo de relación:** `tarea.estudianteId` → `usuario.id`

**Ejemplo:**

```json
// Estudiante
{ "id": "4", "nombre": "Edgar" }

// Sus tareas
{ "id": "1", "estudianteId": "4", "titulo": "Crear componente React" }
{ "id": "2", "estudianteId": "4", "titulo": "API REST con Node.js" }
```

---

## 📊 Resumen de Datos Mock

### Cantidades

| Entidad          | Cantidad |
| ---------------- | -------- |
| Usuarios (total) | 8        |
| - Profesores     | 3        |
| - Estudiantes    | 5        |
| Módulos          | 29       |
| Inscripciones    | 20       |
| Tareas           | 14       |

### Distribución de Módulos por Ciclo

| Ciclo | Nombre                                 | Módulos |
| ----- | -------------------------------------- | ------- |
| DAW   | Desarrollo de Aplicaciones Web         | 8       |
| ARI   | Automatización y Robótica Industrial   | 7       |
| SMR   | Sistemas Microinformáticos y Redes     | 7       |
| IEA   | Instalaciones Eléctricas y Automáticas | 7       |

---

## 🔍 Consultas Típicas

### Obtener módulos de un estudiante

1. Buscar en `modulosEstudiantes` por `estudianteId`
2. Obtener los `moduloId` de cada inscripción
3. Buscar en `modulos` cada uno de esos IDs

### Obtener tareas de un estudiante en un módulo

1. Filtrar `tareas` por `estudianteId` Y `moduloId`

### Obtener estudiantes de un módulo

1. Buscar en `modulosEstudiantes` por `moduloId`
2. Obtener los `estudianteId` de cada inscripción
3. Buscar en `usuarios` cada uno de esos IDs

### Obtener módulos que imparte un profesor

1. Filtrar `modulos` por `profesorId`

---

**Última actualización:** 22/12/2025
