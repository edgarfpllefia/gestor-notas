# Historia 1: Planificación de Estructuras de Datos

## Descripción

**Como** desarrollador  
**Quiero** planificar y definir las estructuras de datos del proyecto  
**Para** tener una base sólida antes de comenzar el desarrollo

## Criterios de Aceptación

- Deben estar definidas todas las interfaces TypeScript necesarias
- Debe estar documentada la estructura de datos en LocalStorage
- Debe estar definida la estructura del ORM
- Debe haber datos de ejemplo/mock para desarrollo

## Tareas de Implementación

### Análisis y Diseño

- [ x ] Analizar requisitos del proyecto
- [ x ] Identificar todas las entidades necesarias:
  - [ x ] Usuario (estudiante y administrador)
  - [ x ] Módulo (definición general)
  - [ x ] MóduloEstudiante (módulo del estudiante con notas y estado)
  - [ x ] Tarea
  - [ x ] Ciclo formativo (definición)
- [ x ] Definir relaciones entre entidades
- [ x ] Diseñar diagrama de entidades (opcional, texto)

### Definición de Interfaces TypeScript

- [ x ] Crear archivo `src/types/index.ts` o similar
- [ x ] Definir interfaz `Usuario`:
  - [ x ] id: string
  - [ x ] nombre: string
  - [ x ] email: string
  - [ x ] password: string
  - [ x ] cicloFormativo: string
  - [ x ] rol: 'estudiante' | 'administrador'
- [ x ] Definir interfaz `Modulo`:
  - [ x ] id: string
  - [ x ] nombre: string
  - [ x ] curso: 1 | 2
  - [ x ] cicloFormativo: string
- [ x ] Definir interfaz `ModuloEstudiante`:
  - [ x ] id: string
  - [ x ] moduloId: string
  - [ x ] estudianteId: string
  - [ x ] notas: objeto con trimestre1, trimestre2, trimestre3, ordinaria, extraordinaria
  - [ x ] estado: 'aprobado' | 'cursando' | 'no-cursa' | 'pendiente'
- [ x ] Definir interfaz `Tarea`:
  - [ x ] id: string
  - [ x ] moduloId: string
  - [ x ] estudianteId: string
  - [ x ] titulo: string
  - [ x ] descripcion: string
  - [ x ] fechaCreacion: string
  - [ x ] fechaVencimiento?: string
  - [ x ] estado: 'pendiente' | 'en-progreso' | 'completada'
  - [ x ] nota?: number
- [ x ] Definir tipo `CicloFormativo` (enum o union type)
- [ x ] Definir tipos auxiliares si son necesarios

### Estructura de LocalStorage

- [ x ] Definir claves de LocalStorage:
  - [ x ] 'usuarios'
  - [ x ] 'modulos'
  - [ x ] 'modulosEstudiantes'
  - [ x ] 'tareas'
- [ x ] Documentar estructura de cada clave
- [ x ] Crear funciones helper para leer/escribir LocalStorage

### Diseño del ORM

- [ ] Definir interfaz base `DataRepository<T>`
- [ ] Definir métodos básicos:
  - [ ] getAll(): Promise<T[]>
  - [ ] getById(id: string): Promise<T | undefined>
  - [ ] create(item: Omit<T, 'id'>): Promise<T>
  - [ ] update(id: string, item: Partial<T>): Promise<T>
  - [ ] delete(id: string): Promise<void>
- [ ] Definir interfaces específicas:
  - [ ] UsuarioRepository (con getByEmail)
  - [ ] ModuloRepository
  - [ ] ModuloEstudianteRepository (con getByEstudianteId, getByModuloId)
  - [ ] TareaRepository (con getByModuloId, getByEstudianteId)
- [ ] Documentar estructura del ORM

### Datos de Ejemplo/Mock

- [ x ] Crear archivo `src/data/mockData.ts` o similar
- [ x ] Crear datos de ejemplo de módulos para cada ciclo:
  - [ x ] Desarrollo de Aplicaciones Web
  - [ x ] Automatización y Robótica Industrial
  - [ x ] Sistemas Microinformáticos
  - [ x ] Instalaciones Eléctricas y Automáticas
- [ x ] Crear función para inicializar datos en LocalStorage
- [ x ] Documentar cómo usar los datos de ejemplo

### Implementación Básica del ORM

- [ x ] Crear carpeta `src/data/repositories/`
- [ x ] Crear clase base o interfaz para repositorios
- [ x ] Crear `LocalStorageUsuarioRepository` (estructura básica)
- [ x ] Crear `LocalStorageModuloRepository` (estructura básica)
- [ x ] Crear `LocalStorageModuloEstudianteRepository` (estructura básica)
- [ x ] Crear `LocalStorageTareaRepository` (estructura básica)
- [ x ] Implementar funciones helper para LocalStorage

### Funciones Helper

- [ x ] Crear función `leerDatos(key: string): any[]`
- [ x ] Crear función `guardarDatos(key: string, datos: any[]): void`
- [ x ] Crear función `generarId(): string`
- [ x ] Crear función `inicializarDatos()` para cargar datos de ejemplo

### Documentación

- [ ] Documentar todas las interfaces en comentarios JSDoc
- [ x ] Crear documento explicando la estructura de datos
- [ x ] Documentar cómo se relacionan las entidades
- [ x ] Documentar el flujo de datos

### Testing de Estructuras

- [ x ] Verificar que las interfaces TypeScript compilan correctamente
- [ x ] Probar funciones helper de LocalStorage
- [ x ] Probar inicialización de datos de ejemplo
- [ x ] Verificar que los datos se guardan correctamente

### Validación

- [ ] Revisar estructuras con la pareja
- [ ] Asegurar que cubren todos los requisitos
- [ ] Verificar que son extensibles para la Fase 2 (API)

## Notas Técnicas

- Usar TypeScript con tipado ligero inicialmente
- Las interfaces pueden usar `any` en algunos campos si es necesario para empezar
- Los datos de ejemplo deben ser realistas pero simples
- El ORM debe ser fácil de extender para la Fase 2

## Estructura de Archivos Sugerida

```
src/
├── types/
│   └── index.ts          # Todas las interfaces
├── data/
│   ├── repositories/     # Implementaciones del ORM
│   ├── mockData.ts       # Datos de ejemplo
│   └── utils.ts          # Funciones helper
```

## Estimación

**Tiempo estimado**: 4-5 horas (S-M)

## Prioridad

**CRÍTICA** - Debe hacerse antes de cualquier otra historia

## Dependencias

Ninguna - Esta es la historia base

## Notas Adicionales

- Esta historia debe completarse antes de comenzar con Historia 3
- Es importante tener bien definidas las estructuras para evitar refactorizaciones posteriores
- Los datos de ejemplo facilitarán el desarrollo y testing

---

[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
