import { STORAGE_KEYS } from "./storage.ts";

//USUARIOS

export const mockUsuarios = [
  // Profesores
  {
    id: "1",
    nombre: "María García Rodríguez",
    email: "maria.garcia@instituto.es",
    rol: "profesor",
    especialidad: "Informática",
  },
  {
    id: "2",
    nombre: "Juan Martínez López",
    email: "juan.martinez@instituto.es",
    rol: "profesor",
    especialidad: "Electricidad",
  },
  {
    id: "3",
    nombre: "Ana López Fernández",
    email: "ana.lopez@instituto.es",
    rol: "profesor",
    especialidad: "Robótica",
  },

  // Estudiantes
  {
    id: "4",
    nombre: "Edgar Fernández García",
    email: "edgar.fernandez@alumno.es",
    rol: "estudiante",
    ciclo: "DAW",
  },
  {
    id: "5",
    nombre: "Laura Sánchez Martín",
    email: "laura.sanchez@alumno.es",
    rol: "estudiante",
    ciclo: "DAW",
  },
  {
    id: "6",
    nombre: "Carlos Ruiz Gómez",
    email: "carlos.ruiz@alumno.es",
    rol: "estudiante",
    ciclo: "SMR",
  },
  {
    id: "7",
    nombre: "Sofía Moreno Torres",
    email: "sofia.moreno@alumno.es",
    rol: "estudiante",
    ciclo: "ARI",
  },
  {
    id: "8",
    nombre: "David Torres Pérez",
    email: "david.torres@alumno.es",
    rol: "estudiante",
    ciclo: "IEA",
  },
];

//MODULOS

export const mockModulos = [
  // --- DESARROLLO DE APLICACIONES WEB (DAW) ---
  {
    id: "1",
    codigo: "0483",
    nombre: "Bases de Datos",
    ciclo: "DAW",
    curso: 1,
    horas: 192,
    profesorId: "1",
    descripcion: "Diseño y gestión de bases de datos relacionales",
  },
  {
    id: "2",
    codigo: "0484",
    nombre: "Programación",
    ciclo: "DAW",
    curso: 1,
    horas: 256,
    profesorId: "1",
    descripcion: "Fundamentos de programación orientada a objetos",
  },
  {
    id: "3",
    codigo: "0485",
    nombre: "Lenguajes de Marcas y Sistemas de Gestión de Información",
    ciclo: "DAW",
    curso: 1,
    horas: 128,
    profesorId: "1",
    descripcion: "XML, JSON, HTML y tecnologías de marcado",
  },
  {
    id: "4",
    codigo: "0487",
    nombre: "Entornos de Desarrollo",
    ciclo: "DAW",
    curso: 1,
    horas: 96,
    profesorId: "1",
    descripcion: "IDEs, control de versiones y metodologías ágiles",
  },
  {
    id: "5",
    codigo: "0373",
    nombre: "Desarrollo Web en Entorno Cliente",
    ciclo: "DAW",
    curso: 2,
    horas: 140,
    profesorId: "1",
    descripcion: "JavaScript, frameworks frontend y UX",
  },
  {
    id: "6",
    codigo: "0374",
    nombre: "Desarrollo Web en Entorno Servidor",
    ciclo: "DAW",
    curso: 2,
    horas: 180,
    profesorId: "1",
    descripcion: "PHP, Node.js y desarrollo backend",
  },
  {
    id: "7",
    codigo: "0376",
    nombre: "Diseño de Interfaces Web",
    ciclo: "DAW",
    curso: 2,
    horas: 120,
    profesorId: "1",
    descripcion: "CSS, diseño responsive y accesibilidad",
  },
  {
    id: "8",
    codigo: "0375",
    nombre: "Despliegue de Aplicaciones Web",
    ciclo: "DAW",
    curso: 2,
    horas: 100,
    profesorId: "1",
    descripcion: "Servidores web, contenedores y CI/CD",
  },

  // --- AUTOMATIZACIÓN Y ROBÓTICA INDUSTRIAL (ARI) ---
  {
    id: "9",
    codigo: "0963",
    nombre: "Sistemas Eléctricos y Electrónicos",
    ciclo: "ARI",
    curso: 1,
    horas: 160,
    profesorId: "3",
    descripcion: "Circuitos eléctricos y componentes electrónicos",
  },
  {
    id: "10",
    codigo: "0964",
    nombre: "Elementos de Máquinas",
    ciclo: "ARI",
    curso: 1,
    horas: 128,
    profesorId: "3",
    descripcion: "Mecánica aplicada y elementos de transmisión",
  },
  {
    id: "11",
    codigo: "0965",
    nombre: "Diseño de Sistemas de Control",
    ciclo: "ARI",
    curso: 1,
    horas: 160,
    profesorId: "3",
    descripcion: "Automatización de procesos industriales",
  },
  {
    id: "12",
    codigo: "0966",
    nombre: "Informática Industrial",
    ciclo: "ARI",
    curso: 1,
    horas: 192,
    profesorId: "3",
    descripcion: "SCADA, HMI y comunicaciones industriales",
  },
  {
    id: "13",
    codigo: "0967",
    nombre: "Sistemas Neumáticos y Oleohidráulicos",
    ciclo: "ARI",
    curso: 2,
    horas: 105,
    profesorId: "3",
    descripcion: "Sistemas de potencia fluida",
  },
  {
    id: "14",
    codigo: "0968",
    nombre: "Robótica Industrial",
    ciclo: "ARI",
    curso: 2,
    horas: 147,
    profesorId: "3",
    descripcion: "Programación y manejo de robots industriales",
  },
  {
    id: "15",
    codigo: "0969",
    nombre: "Comunicaciones Industriales",
    ciclo: "ARI",
    curso: 2,
    horas: 84,
    profesorId: "3",
    descripcion: "Redes industriales y protocolos de comunicación",
  },

  // --- SISTEMAS MICROINFORMÁTICOS Y REDES (SMR) ---
  {
    id: "16",
    codigo: "0221",
    nombre: "Montaje y Mantenimiento de Equipos",
    ciclo: "SMR",
    curso: 1,
    horas: 224,
    profesorId: "1",
    descripcion: "Hardware, ensamblaje y diagnóstico de equipos",
  },
  {
    id: "17",
    codigo: "0222",
    nombre: "Sistemas Operativos Monopuesto",
    ciclo: "SMR",
    curso: 1,
    horas: 192,
    profesorId: "1",
    descripcion: "Windows, Linux y gestión de usuarios",
  },
  {
    id: "18",
    codigo: "0223",
    nombre: "Aplicaciones Ofimáticas",
    ciclo: "SMR",
    curso: 1,
    horas: 256,
    profesorId: "1",
    descripcion: "Suite ofimática y herramientas de productividad",
  },
  {
    id: "19",
    codigo: "0224",
    nombre: "Redes Locales",
    ciclo: "SMR",
    curso: 1,
    horas: 224,
    profesorId: "1",
    descripcion: "Configuración de redes LAN y cableado estructurado",
  },
  {
    id: "20",
    codigo: "0228",
    nombre: "Sistemas Operativos en Red",
    ciclo: "SMR",
    curso: 2,
    horas: 147,
    profesorId: "1",
    descripcion: "Servidores Windows/Linux y Active Directory",
  },
  {
    id: "21",
    codigo: "0229",
    nombre: "Seguridad Informática",
    ciclo: "SMR",
    curso: 2,
    horas: 105,
    profesorId: "1",
    descripcion: "Ciberseguridad, firewall y políticas de seguridad",
  },
  {
    id: "22",
    codigo: "0230",
    nombre: "Servicios en Red",
    ciclo: "SMR",
    curso: 2,
    horas: 147,
    profesorId: "1",
    descripcion: "DNS, DHCP, web y correo electrónico",
  },

  // --- INSTALACIONES ELÉCTRICAS Y AUTOMÁTICAS (IEA) ---
  {
    id: "23",
    codigo: "0232",
    nombre: "Automatismos Industriales",
    ciclo: "IEA",
    curso: 1,
    horas: 224,
    profesorId: "2",
    descripcion: "Automatización con contactores y PLCs",
  },
  {
    id: "24",
    codigo: "0233",
    nombre: "Electrónica",
    ciclo: "IEA",
    curso: 1,
    horas: 128,
    profesorId: "2",
    descripcion: "Componentes electrónicos y circuitos",
  },
  {
    id: "25",
    codigo: "0234",
    nombre: "Electrotecnia",
    ciclo: "IEA",
    curso: 1,
    horas: 192,
    profesorId: "2",
    descripcion: "Corriente alterna, trifásica y máquinas eléctricas",
  },
  {
    id: "26",
    codigo: "0235",
    nombre: "Instalaciones Eléctricas Interiores",
    ciclo: "IEA",
    curso: 1,
    horas: 256,
    profesorId: "2",
    descripcion: "Instalaciones de baja tensión según REBT",
  },
  {
    id: "27",
    codigo: "0236",
    nombre: "Instalaciones de Distribución",
    ciclo: "IEA",
    curso: 2,
    horas: 105,
    profesorId: "2",
    descripcion: "Redes de distribución eléctrica",
  },
  {
    id: "28",
    codigo: "0238",
    nombre: "Instalaciones Domóticas",
    ciclo: "IEA",
    curso: 2,
    horas: 84,
    profesorId: "2",
    descripcion: "Sistemas KNX y automatización de viviendas",
  },
  {
    id: "29",
    codigo: "0239",
    nombre: "Instalaciones Solares Fotovoltaicas",
    ciclo: "IEA",
    curso: 2,
    horas: 84,
    profesorId: "2",
    descripcion: "Energía solar y sistemas fotovoltaicos",
  },
];

// ===== RELACIONES MÓDULO-ESTUDIANTE =====
export const mockModulosEstudiantes = [
  // Edgar (id: 4, DAW) - Estudiante de 2º año
  { id: "1", estudianteId: "4", moduloId: "5", fechaInscripcion: "2024-09-01" },
  { id: "2", estudianteId: "4", moduloId: "6", fechaInscripcion: "2024-09-01" },
  { id: "3", estudianteId: "4", moduloId: "7", fechaInscripcion: "2024-09-01" },
  { id: "4", estudianteId: "4", moduloId: "8", fechaInscripcion: "2024-09-01" },

  // Laura (id: 5, DAW) - Estudiante de 1º año
  { id: "5", estudianteId: "5", moduloId: "1", fechaInscripcion: "2024-09-01" },
  { id: "6", estudianteId: "5", moduloId: "2", fechaInscripcion: "2024-09-01" },
  { id: "7", estudianteId: "5", moduloId: "3", fechaInscripcion: "2024-09-01" },
  { id: "8", estudianteId: "5", moduloId: "4", fechaInscripcion: "2024-09-01" },

  // Carlos (id: 6, SMR) - Estudiante de 1º año
  {
    id: "9",
    estudianteId: "6",
    moduloId: "16",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "10",
    estudianteId: "6",
    moduloId: "17",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "11",
    estudianteId: "6",
    moduloId: "18",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "12",
    estudianteId: "6",
    moduloId: "19",
    fechaInscripcion: "2024-09-01",
  },

  // Sofía (id: 7, ARI) - Estudiante de 1º año
  {
    id: "13",
    estudianteId: "7",
    moduloId: "9",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "14",
    estudianteId: "7",
    moduloId: "10",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "15",
    estudianteId: "7",
    moduloId: "11",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "16",
    estudianteId: "7",
    moduloId: "12",
    fechaInscripcion: "2024-09-01",
  },

  // David (id: 8, IEA) - Estudiante de 1º año
  {
    id: "17",
    estudianteId: "8",
    moduloId: "23",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "18",
    estudianteId: "8",
    moduloId: "24",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "19",
    estudianteId: "8",
    moduloId: "25",
    fechaInscripcion: "2024-09-01",
  },
  {
    id: "20",
    estudianteId: "8",
    moduloId: "26",
    fechaInscripcion: "2024-09-01",
  },
];

// ===== TAREAS =====
export const mockTareas = [
  // Tareas de Edgar (id: 4, DAW - 2º año)
  {
    id: "1",
    moduloId: "5",
    estudianteId: "4",
    titulo: "Crear componente React reutilizable",
    descripcion:
      "Desarrollar un componente de tarjeta (card) en React con props personalizables para mostrar información de productos",
    fechaCreacion: "2025-01-05",
    fechaEntrega: "2025-01-15",
    estado: "pendiente",
    prioridad: "alta",
  },
  {
    id: "2",
    moduloId: "5",
    estudianteId: "4",
    titulo: "Implementar gestión de estado con useState",
    descripcion:
      "Crear una aplicación de lista de tareas (ToDo List) usando hooks de React: useState, useEffect",
    fechaCreacion: "2025-01-08",
    fechaEntrega: "2025-01-20",
    estado: "en-progreso",
    prioridad: "media",
  },
  {
    id: "3",
    moduloId: "6",
    estudianteId: "4",
    titulo: "API REST con Node.js y Express",
    descripcion:
      "Crear endpoints CRUD completos para gestión de usuarios: POST, GET, PUT, DELETE con validación de datos",
    fechaCreacion: "2025-01-10",
    fechaEntrega: "2025-01-25",
    estado: "pendiente",
    prioridad: "alta",
  },
  {
    id: "4",
    moduloId: "7",
    estudianteId: "4",
    titulo: "Diseño responsive con Tailwind CSS",
    descripcion:
      "Maquetar una landing page responsive que se adapte a móvil, tablet y desktop usando Tailwind",
    fechaCreacion: "2025-01-12",
    fechaEntrega: "2025-01-30",
    estado: "completada",
    prioridad: "media",
  },

  // Tareas de Laura (id: 5, DAW - 1º año)
  {
    id: "5",
    moduloId: "1",
    estudianteId: "5",
    titulo: "Diseño de base de datos normalizada",
    descripcion:
      "Crear diagrama Entidad-Relación para sistema de biblioteca y normalizar hasta 3FN",
    fechaCreacion: "2025-01-03",
    fechaEntrega: "2025-01-18",
    estado: "completada",
    prioridad: "alta",
  },
  {
    id: "6",
    moduloId: "2",
    estudianteId: "5",
    titulo: "Ejercicios de POO en Java",
    descripcion:
      "Implementar sistema de gestión de vehículos usando clases, herencia y polimorfismo",
    fechaCreacion: "2025-01-06",
    fechaEntrega: "2025-01-22",
    estado: "en-progreso",
    prioridad: "alta",
  },
  {
    id: "7",
    moduloId: "3",
    estudianteId: "5",
    titulo: "Parsear XML con DOM",
    descripcion:
      "Crear programa que lea archivo XML de empleados y genere informe HTML",
    fechaCreacion: "2025-01-09",
    fechaEntrega: "2025-01-28",
    estado: "pendiente",
    prioridad: "media",
  },

  // Tareas de Carlos (id: 6, SMR)
  {
    id: "8",
    moduloId: "16",
    estudianteId: "6",
    titulo: "Montaje de PC completo",
    descripcion:
      "Ensamblar equipo completo: placa base, procesador, RAM, almacenamiento, fuente. Documentar proceso",
    fechaCreacion: "2025-01-04",
    fechaEntrega: "2025-01-16",
    estado: "en-progreso",
    prioridad: "alta",
  },
  {
    id: "9",
    moduloId: "19",
    estudianteId: "6",
    titulo: "Configuración de red LAN",
    descripcion:
      "Configurar switch gestionable, crear VLANs y configurar enrutamiento inter-VLAN",
    fechaCreacion: "2025-01-11",
    fechaEntrega: "2025-01-30",
    estado: "pendiente",
    prioridad: "media",
  },
  {
    id: "10",
    moduloId: "17",
    estudianteId: "6",
    titulo: "Instalación dual boot Windows/Linux",
    descripcion:
      "Instalar Windows 11 y Ubuntu en dual boot, configurar particiones correctamente",
    fechaCreacion: "2025-01-07",
    fechaEntrega: "2025-01-21",
    estado: "completada",
    prioridad: "media",
  },

  // Tareas de Sofía (id: 7, ARI)
  {
    id: "11",
    moduloId: "9",
    estudianteId: "7",
    titulo: "Análisis de circuitos en corriente alterna",
    descripcion:
      "Resolver 10 circuitos mixtos RLC calculando tensiones, corrientes y factor de potencia",
    fechaCreacion: "2025-01-02",
    fechaEntrega: "2025-01-17",
    estado: "completada",
    prioridad: "alta",
  },
  {
    id: "12",
    moduloId: "11",
    estudianteId: "7",
    titulo: "Programación de PLC Siemens S7-1200",
    descripcion:
      "Crear programa LADDER para automatizar proceso de embotellado con sensores y actuadores",
    fechaCreacion: "2025-01-08",
    fechaEntrega: "2025-01-26",
    estado: "en-progreso",
    prioridad: "alta",
  },

  // Tareas de David (id: 8, IEA)
  {
    id: "13",
    moduloId: "23",
    estudianteId: "8",
    titulo: "Diseño de cuadro eléctrico industrial",
    descripcion:
      "Diseñar cuadro para arranque estrella-triángulo de motor trifásico con protecciones",
    fechaCreacion: "2025-01-05",
    fechaEntrega: "2025-01-28",
    estado: "pendiente",
    prioridad: "alta",
  },
  {
    id: "14",
    moduloId: "25",
    estudianteId: "8",
    titulo: "Cálculo de instalación trifásica",
    descripcion:
      "Calcular sección de cables, protecciones y caída de tensión para instalación de 50kW",
    fechaCreacion: "2025-01-10",
    fechaEntrega: "2025-02-01",
    estado: "en-progreso",
    prioridad: "media",
  },
];

// FUNCIONES HELPER

export function inicializarDatosMock() {
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(mockUsuarios));
  localStorage.setItem(STORAGE_KEYS.MODULOS, JSON.stringify(mockModulos));
  localStorage.setItem(
    STORAGE_KEYS.MODULOS_ESTUDIANTES,
    JSON.stringify(mockModulosEstudiantes)
  );
  localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(mockTareas));
}

// ESTA FUNCIÓN ME LA HA RECOMENDADO LA IA

export function limpiarDatos() {
  localStorage.removeItem(STORAGE_KEYS.USUARIOS);
  localStorage.removeItem(STORAGE_KEYS.MODULOS);
  localStorage.removeItem(STORAGE_KEYS.MODULOS_ESTUDIANTES);
  localStorage.removeItem(STORAGE_KEYS.TAREAS);
}
