# Historia 10: Gestión de Notas de Tareas

## Descripción

**Como** estudiante autenticado  
**Quiero** añadir y modificar las notas de mis tareas  
**Para** hacer seguimiento de mi evaluación en cada tarea

## Criterios de Aceptación

- Debe permitir añadir una nota a cada tarea
- Debe permitir modificar la nota de una tarea existente
- Las notas deben guardarse correctamente
- Debe mostrar la nota de cada tarea

## Tareas de Implementación

### Diseño y Planificación
- [ ] Diseñar interfaz para añadir/modificar nota de tarea
- [ ] Decidir dónde mostrar la nota (en la tarjeta, en detalle, etc.)
- [ ] Definir rango de notas (0-10 o 0-100)
- [ ] Crear mockup/wireframe

### Configuración Inicial
- [ ] Actualizar componente `TareaCard` o `TareaItem` para mostrar nota
- [ ] Crear componente `NotaTarea` (input para nota)
- [ ] Integrar en formulario de tarea o vista de detalle

### Visualización de Nota
- [ ] Mostrar nota en la tarjeta de tarea (si existe)
- [ ] Mostrar indicador visual si tiene nota
- [ ] Aplicar estilos diferenciados según nota (opcional)
- [ ] Mostrar "Sin nota" si no tiene nota asignada

### Añadir Nota
- [ ] Crear input para añadir nota
- [ ] Validar que la nota sea un número
- [ ] Validar rango de notas (0-10 o 0-100)
- [ ] Permitir dejar nota vacía (eliminar nota)
- [ ] Implementar función para actualizar nota en ORM
- [ ] Guardar nota en LocalStorage
- [ ] Actualizar UI tras guardar

### Modificar Nota
- [ ] Permitir editar nota existente
- [ ] Cargar nota actual en el input
- [ ] Validar cambios
- [ ] Guardar cambios
- [ ] Actualizar UI

### Integración con Formulario de Tarea
- [ ] Añadir campo de nota al formulario de crear/editar tarea
- [ ] O crear componente separado para gestionar nota
- [ ] Decidir si la nota se añade al crear o después

### Validaciones
- [ ] Validar formato numérico
- [ ] Validar rango de notas
- [ ] Mostrar mensajes de error si aplica

### Persistencia de Datos
- [ ] Verificar que la nota se guarda en la estructura de tarea
- [ ] Verificar que la nota persiste al recargar
- [ ] Verificar que se puede eliminar la nota (dejar vacía)

### Testing y Validación
- [ ] Probar añadir nota a una tarea
- [ ] Probar modificar nota existente
- [ ] Probar eliminar nota (dejar vacía)
- [ ] Probar validaciones
- [ ] Verificar que la nota se muestra correctamente
- [ ] Verificar que los datos se guardan correctamente
- [ ] Revisar código con la pareja

### Documentación
- [ ] Documentar cómo se gestionan las notas de tareas
- [ ] Documentar componentes creados
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- La nota es opcional (puede estar vacía)
- La nota se guarda en la propiedad `nota` de la tarea
- Considerar mostrar la nota de forma destacada si es alta/baja

## Estimación

**Tiempo estimado**: 3-4 horas (S)

## Prioridad

Media - Funcionalidad complementaria




---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)

