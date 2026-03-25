export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  cicloFormativo: string;
  rol: "estudiante" | "administrador";
}

export interface Modulo {
  id: string;
  nombre: string;
  curso: 1 | 2;
  cicloFormativo: string;
}

export interface ModuloEstudiante {
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

export interface Tarea {
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
