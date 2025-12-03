# Historia 12: Gestión de Módulos por Administrador

## Descripción

**Como** administrador  
**Quiero** gestionar los módulos para cada ciclo formativo  
**Para** mantener actualizada la información de los ciclos

## Criterios de Aceptación

- Debe permitir crear nuevos módulos para un ciclo formativo
- Debe permitir editar módulos existentes
- Debe permitir eliminar módulos
- Debe permitir asignar módulos a ciclos formativos específicos
- Los cambios deben reflejarse en los estudiantes del ciclo correspondiente

## Tareas de Implementación

### Diseño y Planificación
- [ ] Diseñar panel de administración
- [ ] Diseñar formulario de creación/edición de módulo
- [ ] Diseñar lista de módulos por ciclo
- [ ] Definir qué hacer cuando se crea/elimina un módulo (añadir a estudiantes)
- [ ] Crear mockup/wireframe

### Configuración Inicial
- [ ] Crear ruta/página de administración (protegida para admin)
- [ ] Crear componente `AdminPanel` o `GestionModulos`
- [ ] Crear componente `ModuloForm` (crear/editar)
- [ ] Crear componente `ListaModulosAdmin`
- [ ] Verificar autenticación de administrador

### Autenticación de Administrador
- [ ] Verificar que el usuario tiene rol de administrador
- [ ] Proteger rutas de administración
- [ ] Redirigir si no es administrador

### Visualización de Módulos por Ciclo
- [ ] Crear selector de ciclo formativo
- [ ] Mostrar módulos del ciclo seleccionado
- [ ] Mostrar información de cada módulo:
  - [ ] Nombre
  - [ ] Curso (1º o 2º)
  - [ ] Ciclo formativo
- [ ] Aplicar estilos con Tailwind CSS
- [ ] Usar componentes de Shadcn/ui

### Crear Módulo
- [ ] Crear botón "Nuevo Módulo"
- [ ] Implementar formulario de creación:
  - [ ] Campo nombre (obligatorio)
  - [ ] Campo curso (1º o 2º, obligatorio)
  - [ ] Selector de ciclo formativo (obligatorio)
  - [ ] Botones guardar/cancelar
- [ ] Validar campos obligatorios
- [ ] Implementar función de creación en ORM
- [ ] Guardar módulo en LocalStorage
- [ ] **Añadir automáticamente el módulo a todos los estudiantes del ciclo**:
  - [ ] Obtener todos los estudiantes del ciclo
  - [ ] Crear `ModuloEstudiante` para cada estudiante
  - [ ] Guardar en LocalStorage
- [ ] Actualizar lista tras crear

### Editar Módulo
- [ ] Crear botón "Editar" en cada módulo
- [ ] Implementar formulario de edición (reutilizar `ModuloForm`)
- [ ] Cargar datos del módulo en el formulario
- [ ] Validar campos
- [ ] Implementar función de actualización en ORM
- [ ] Actualizar módulo en LocalStorage
- [ ] **Actualizar módulos de estudiantes si cambia el ciclo**:
  - [ ] Si cambia el ciclo, mover módulos entre estudiantes
- [ ] Actualizar lista tras editar

### Eliminar Módulo
- [ ] Crear botón "Eliminar" en cada módulo
- [ ] Implementar diálogo de confirmación
- [ ] Implementar función de eliminación en ORM
- [ ] Eliminar módulo de LocalStorage
- [ ] **Eliminar módulo de todos los estudiantes del ciclo**:
  - [ ] Obtener todos los estudiantes del ciclo
  - [ ] Eliminar `ModuloEstudiante` correspondiente
  - [ ] Actualizar LocalStorage
- [ ] Actualizar lista tras eliminar
- [ ] Usar componente de diálogo de Shadcn/ui

### Persistencia de Datos
- [ ] Verificar que los módulos se guardan correctamente
- [ ] Verificar que se añaden a los estudiantes al crear
- [ ] Verificar que se eliminan de los estudiantes al eliminar
- [ ] Verificar estructura de datos

### Manejo de Errores
- [ ] Manejar errores al crear/editar/eliminar
- [ ] Mostrar mensajes de error apropiados
- [ ] Validar que no se dupliquen módulos

### Testing y Validación
- [ ] Probar creación de módulo
- [ ] Verificar que se añade a estudiantes del ciclo
- [ ] Probar edición de módulo
- [ ] Probar eliminación de módulo
- [ ] Verificar que se elimina de estudiantes
- [ ] Probar validaciones
- [ ] Verificar protección de rutas (solo admin)
- [ ] Revisar código con la pareja

### Documentación
- [ ] Documentar panel de administración
- [ ] Documentar funciones CRUD de módulos
- [ ] Documentar lógica de sincronización con estudiantes
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Los módulos son gestionados por el administrador
- Al crear un módulo, se debe añadir automáticamente a todos los estudiantes del ciclo
- Al eliminar un módulo, se debe eliminar de todos los estudiantes del ciclo
- Considerar impacto en datos existentes al editar

## Estimación

**Tiempo estimado**: 6-8 horas (M-L)

## Prioridad

Media - Funcionalidad de administración




---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)

