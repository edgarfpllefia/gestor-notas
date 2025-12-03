# Historia 6: Visualización de Módulos Propios

## Descripción

**Como** estudiante autenticado  
**Quiero** ver los módulos de mi ciclo formativo  
**Para** acceder a mis tareas

## Criterios de Aceptación

- Debe mostrar solo los módulos del ciclo del estudiante
- Debe permitir filtrar por curso (1º o 2º)
- Debe permitir ordenar los módulos

## Tareas de Implementación

### Diseño y Planificación

- [ ] Diseñar la vista de módulos del estudiante
- [ ] Diseñar filtros y ordenación
- [ ] Definir qué información mostrar de cada módulo
- [ ] Crear mockup/wireframe

### Configuración Inicial

- [ ] Crear componente `ModulosEstudiante`
- [ ] Crear página/ruta `/estudiante/modulos` o similar
- [ ] Crear componente `FiltroModulos`
- [ ] Crear componente `OrdenacionModulos`

### Obtención de Datos

- [ ] Obtener el ciclo formativo del estudiante autenticado
- [ ] Obtener módulos del estudiante desde el ORM
- [ ] Cargar datos al montar el componente (useEffect)
- [ ] Manejar estado de carga

### Visualización de Módulos

- [ ] Renderizar módulos en formato de tarjetas
- [ ] Mostrar información relevante:
  - [ ] Nombre del módulo
  - [ ] Curso (1º o 2º)
  - [ ] Estado del módulo (aprobado, cursando, etc.)
  - [ ] Notas del módulo (opcional, resumen)
- [ ] Aplicar estilos con Tailwind CSS
- [ ] Usar componentes de Shadcn/ui

### Implementación de Filtros

- [ ] Crear filtro por curso (1º, 2º, Todos)
- [ ] Implementar lógica de filtrado
- [ ] Actualizar lista de módulos al cambiar filtro
- [ ] Aplicar estilos al selector de filtro

### Implementación de Ordenación

- [ ] Crear selector de criterio de ordenación:
  - [ ] Por nombre
  - [ ] Por curso
  - [ ] Por estado
  - [ ] Por nota (si aplica)
- [ ] Implementar lógica de ordenación
- [ ] Actualizar lista al cambiar ordenación
- [ ] Aplicar estilos al selector

### Navegación a Detalle de Módulo

- [ ] Hacer clicable cada tarjeta de módulo
- [ ] Navegar a vista de detalle del módulo
- [ ] Pasar ID del módulo como parámetro

### Persistencia de Datos

- [ ] Verificar que se obtienen correctamente los módulos del estudiante
- [ ] Verificar que los filtros y ordenación funcionan sin modificar datos

### Testing y Validación

- [ ] Probar que se muestran solo los módulos del estudiante
- [ ] Probar filtrado por curso
- [ ] Probar ordenación por diferentes criterios
- [ ] Probar navegación a detalle de módulo
- [ ] Verificar responsive design
- [ ] Revisar código con la pareja

### Documentación

- [ ] Documentar componentes creados
- [ ] Documentar lógica de filtrado y ordenación
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Los módulos ya están asociados al estudiante (añadidos al registrarse)
- Usar `ModuloEstudiante` para obtener los módulos
- Los filtros y ordenación se hacen en el frontend (LocalStorage) o backend (API)

## Estimación

**Tiempo estimado**: 4-5 horas (S-M)

## Prioridad

Alta - Funcionalidad esencial del proyecto


---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
