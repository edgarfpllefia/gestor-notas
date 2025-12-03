# Historia 11: Filtrado y Ordenación

## Descripción

**Como** estudiante autenticado  
**Quiero** filtrar y ordenar módulos y tareas  
**Para** encontrar información rápidamente

## Criterios de Aceptación

- Debe permitir filtrar tareas por módulo, fecha y estado
- Debe permitir ordenar tareas por diferentes criterios
- Debe permitir filtrar y ordenar módulos

## Tareas de Implementación

### Diseño y Planificación
- [ ] Definir criterios de filtrado para tareas:
  - [ ] Por módulo
  - [ ] Por fecha (rango de fechas)
  - [ ] Por estado
- [ ] Definir criterios de ordenación para tareas:
  - [ ] Por fecha de creación
  - [ ] Por fecha de vencimiento
  - [ ] Por estado
  - [ ] Por título
  - [ ] Por nota
- [ ] Definir criterios de filtrado para módulos:
  - [ ] Por curso (ya implementado en Historia 6, verificar)
- [ ] Definir criterios de ordenación para módulos:
  - [ ] Por nombre
  - [ ] Por curso
  - [ ] Por estado
- [ ] Crear mockup/wireframe

### Configuración Inicial
- [ ] Crear componente `FiltroTareas`
- [ ] Crear componente `OrdenacionTareas`
- [ ] Crear componente `FiltroModulos` (si no existe)
- [ ] Crear componente `OrdenacionModulos` (si no existe)

### Filtrado de Tareas
- [ ] Implementar filtro por módulo:
  - [ ] Selector de módulo
  - [ ] Filtrar tareas del módulo seleccionado
- [ ] Implementar filtro por fecha:
  - [ ] Selector de rango de fechas o fecha específica
  - [ ] Filtrar por fecha de creación o vencimiento
- [ ] Implementar filtro por estado:
  - [ ] Selector de estado
  - [ ] Filtrar tareas por estado seleccionado
- [ ] Permitir combinar múltiples filtros
- [ ] Aplicar estilos con Tailwind CSS
- [ ] Usar componentes de Shadcn/ui

### Ordenación de Tareas
- [ ] Implementar ordenación por fecha de creación (ascendente/descendente)
- [ ] Implementar ordenación por fecha de vencimiento
- [ ] Implementar ordenación por estado
- [ ] Implementar ordenación por título (alfabética)
- [ ] Implementar ordenación por nota
- [ ] Crear selector de criterio de ordenación
- [ ] Crear selector de dirección (asc/desc)
- [ ] Aplicar estilos

### Filtrado de Módulos
- [ ] Verificar que el filtro por curso funciona (Historia 6)
- [ ] Añadir filtros adicionales si se requieren:
  - [ ] Por estado del módulo
  - [ ] Por nota (módulos con/sin nota)

### Ordenación de Módulos
- [ ] Verificar que la ordenación funciona (Historia 6)
- [ ] Añadir criterios adicionales si se requieren:
  - [ ] Por estado
  - [ ] Por nota promedio

### Lógica de Filtrado y Ordenación
- [ ] Implementar funciones de filtrado
- [ ] Implementar funciones de ordenación
- [ ] Aplicar filtros y ordenación a la lista
- [ ] Actualizar UI al cambiar filtros/ordenación
- [ ] Mantener filtros/ordenación en estado (useState)

### Persistencia de Preferencias (Opcional)
- [ ] Guardar preferencias de filtrado/ordenación en LocalStorage
- [ ] Restaurar preferencias al cargar la página

### Testing y Validación
- [ ] Probar filtrado de tareas por módulo
- [ ] Probar filtrado de tareas por fecha
- [ ] Probar filtrado de tareas por estado
- [ ] Probar combinación de filtros
- [ ] Probar ordenación de tareas por diferentes criterios
- [ ] Probar filtrado y ordenación de módulos
- [ ] Verificar que los filtros se aplican correctamente
- [ ] Verificar que la ordenación funciona correctamente
- [ ] Revisar código con la pareja

### Documentación
- [ ] Documentar criterios de filtrado y ordenación
- [ ] Documentar componentes creados
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Los filtros y ordenación pueden hacerse en el frontend (LocalStorage) o backend (API)
- Considerar usar useMemo para optimizar filtrado/ordenación
- Los filtros pueden combinarse (AND lógico)

## Estimación

**Tiempo estimado**: 5-6 horas (M)

## Prioridad

Media - Mejora la usabilidad




---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)

