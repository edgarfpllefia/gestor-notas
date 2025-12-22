export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  cicloFormativo: string; // ej: "DAW", "DAM"
  rol: "estudiante" | "administrador";
}

export interface Modulo {
  id: string;
  nombre: string; // ej: "Desarrollo Web en Entorno Cliente"
  curso: 1 | 2;
  cicloFormativo: string; // ej: "DAW"
}

export interface ModuloEstudiante {
  id: string;
  moduloId: string; // Link al módulo original
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

export interface Tarea {
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
