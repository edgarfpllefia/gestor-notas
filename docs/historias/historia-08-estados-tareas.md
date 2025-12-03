# Historia 8: Estados de Tareas

## Descripción

**Como** estudiante autenticado  
**Quiero** marcar tareas con diferentes estados  
**Para** hacer seguimiento de mi progreso

## Criterios de Aceptación

- Debe permitir cambiar el estado de una tarea
- Los estados pueden ser: pendiente, en progreso, completada, etc.
- El estado debe guardarse correctamente

## Tareas de Implementación

### Diseño y Planificación
- [ ] Definir estados posibles de tareas:
  - [ ] Pendiente
  - [ ] En progreso
  - [ ] Completada
  - [ ] (Otros estados si se definen)
- [ ] Diseñar UI para cambiar estado
- [ ] Diseñar indicadores visuales de estado
- [ ] Crear mockup/wireframe

### Configuración Inicial
- [ ] Definir tipos/enum de estados en TypeScript
- [ ] Crear componente `EstadoSelector` o similar
- [ ] Actualizar interfaz `Tarea` con estados definidos

### Implementación de Selector de Estado
- [ ] Crear selector/dropdown para cambiar estado
- [ ] Mostrar estado actual de la tarea
- [ ] Permitir seleccionar nuevo estado
- [ ] Aplicar estilos con Tailwind CSS
- [ ] Usar componentes de Shadcn/ui (Select)

### Lógica de Cambio de Estado
- [ ] Implementar función para actualizar estado en ORM
- [ ] Actualizar estado en LocalStorage
- [ ] Actualizar UI inmediatamente (optimistic update)
- [ ] Manejar errores si falla la actualización

### Indicadores Visuales
- [ ] Añadir colores/iconos según estado:
  - [ ] Pendiente: color gris/amarillo
  - [ ] En progreso: color azul
  - [ ] Completada: color verde
- [ ] Aplicar estilos diferenciados en las tarjetas
- [ ] Mostrar badge o etiqueta con el estado

### Actualización de Lista
- [ ] Actualizar visualización de la tarea al cambiar estado
- [ ] Mantener orden si se ordena por estado
- [ ] Actualizar contadores si existen

### Persistencia de Datos
- [ ] Verificar que el estado se guarda correctamente
- [ ] Verificar que el estado persiste al recargar

### Testing y Validación
- [ ] Probar cambio de estado de pendiente a en progreso
- [ ] Probar cambio de estado a completada
- [ ] Probar todos los estados posibles
- [ ] Verificar que el estado se guarda correctamente
- [ ] Verificar indicadores visuales
- [ ] Revisar código con la pareja

### Documentación
- [ ] Documentar estados definidos
- [ ] Documentar componente de selector
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Estados definidos: 'pendiente' | 'en-progreso' | 'completada'
- El cambio de estado debe ser rápido y visual
- Considerar animaciones sutiles al cambiar estado

## Estimación

**Tiempo estimado**: 3-4 horas (S)

## Prioridad

Media-Alta - Mejora la experiencia de usuario




---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
