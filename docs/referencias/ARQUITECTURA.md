# 🏗️ Anexo: Arquitectura y Datos

Este documento define cómo estructuramos la información en la aplicación. Es la referencia para la **Historia 1**.

---

## 1. Modelo de Datos (Interfaces)

Estas son las definiciones TypeScript que usaremos en toda la app.

### Usuario
Define a la persona que usa la app.
```ts
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  cicloFormativo: string; // ej: "DAW", "DAM"
  rol: "estudiante" | "administrador";
}
```

### Módulo (Asignatura)
Define una asignatura genérica del sistema (creada por admin).
```ts
interface Modulo {
  id: string;
  nombre: string; // ej: "Desarrollo Web en Entorno Cliente"
  curso: 1 | 2;
  cicloFormativo: string; // ej: "DAW"
}
```

### Módulo del Estudiante
Es la relación entre un estudiante y un módulo. Aquí guardamos sus notas personales y el estado.
```ts
interface ModuloEstudiante {
  id: string;
  moduloId: string;     // Link al módulo original
  estudianteId: string; // Link al usuario
  estado: "aprobado" | "cursando" | "no-cursa" | "pendiente"; // ⚠️ Importante: Gestión de estado
  notas: {
    trimestre1?: number;
    trimestre2?: number;
    trimestre3?: number;
    ordinaria?: number;
    extraordinaria?: number;
  };
}
```

### Tarea
Una tarea específica creada por el estudiante dentro de un módulo.
```ts
interface Tarea {
  id: string;
  moduloId: string;
  estudianteId: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaVencimiento?: string;
  estado: "pendiente" | "en-progreso" | "completada"; // ⚠️ Importante: Gestión de estado
  nota?: number; // Nota autoevaluada
}
```

---

## 2. Ciclos Formativos Soportados

Estos son los códigos que usaremos para los ciclos:
*   **DAW**: Desarrollo de Aplicaciones Web
*   **DAM**: Desarrollo de Aplicaciones Multiplataforma
*   **ASIX**: Administración de Sistemas Informáticos en Red
*   **SMR**: Sistemas Microinformáticos y Redes

---
[⬅️ Volver al Manual del Alumno](../MANUAL_ALUMNO.md)
