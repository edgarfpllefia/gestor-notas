# Historia 3: Visualización de Módulos (Usuario No Registrado)

## Descripción

**Como** usuario no registrado  
**Quiero** seleccionar un ciclo formativo y ver sus módulos  
**Para** conocer qué módulos incluye cada ciclo

## Criterios de Aceptación

- Debe existir un selector de ciclos formativos
- Al seleccionar un ciclo, se muestran sus módulos en formato de tarjetas
- Las tarjetas muestran información relevante del módulo

## Tareas de Implementación

### Diseño y Planificación

- [ x ] Definir la estructura de datos para ciclos formativos
- [ x ] Diseñar el componente selector de ciclos
- [ x ] Diseñar el componente de tarjeta de módulo
- [ x ] Crear mockup/wireframe de la interfaz

### Configuración Inicial

- [ x ] Crear componente `CicloSelector`
- [ x ] Crear componente `ModuloCard`
- [ x ] Crear componente `ModuloList`
- [ x ] Configurar rutas para la página principal

### Implementación del Selector

- [ x ] Implementar selector con los 4 ciclos formativos:
  - [ x ] Desarrollo de Aplicaciones Web (Grado Superior)
  - [ x ] Automatización y Robótica Industrial (Grado Superior)
  - [ x ] Sistemas Microinformáticos (Grado Medio)
  - [ x ] Instalaciones Eléctricas y Automáticas (Grado Medio)
- [ x ] Añadir estado para el ciclo seleccionado
- [ x ] Implementar cambio de ciclo seleccionado

### Implementación de Visualización de Módulos

- [ x ] Obtener módulos del ciclo seleccionado desde el ORM
- [ x ] Renderizar módulos en formato de tarjetas
- [ x ] Mostrar información del módulo en cada tarjeta:
  - [ x ] Nombre del módulo
  - [ x ] Curso (1º o 2º)
  - [ x ] Información adicional relevante
- [ x ] Aplicar estilos con Tailwind CSS
- [ x ] Usar componentes de Shadcn/ui si aplica

### Persistencia de Datos

- [ x ] Crear datos iniciales de módulos para cada ciclo (en LocalStorage)
- [ x ] Implementar función en ORM para obtener módulos por ciclo
- [ x ] Verificar que los datos se cargan correctamente

### Testing y Validación

- [ x ] Probar que el selector funciona correctamente
- [ x ] Probar que se muestran los módulos al seleccionar un ciclo
- [ x ] Verificar que las tarjetas muestran la información correcta
- [ x ] Verificar responsive design
- [ x ] Revisar código con la pareja

### Documentación

- [ x ] Documentar componentes creados
- [ x ] Actualizar README si es necesario
- [ x ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Usar LocalStorage para almacenar los módulos inicialmente
- Los módulos deben estar predefinidos para cada ciclo formativo
- Considerar usar Shadcn/ui Card component para las tarjetas

## Estimación

**Tiempo estimado**: 3-4 horas (S)

## Prioridad

Alta - Funcionalidad básica del proyecto

---

[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
