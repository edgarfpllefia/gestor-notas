# Historia 4: Registro de Estudiante

## Descripción

**Como** nuevo usuario  
**Quiero** registrarme seleccionando mi ciclo formativo  
**Para** acceder a las funcionalidades de estudiante

## Criterios de Aceptación

- Debe existir un formulario de registro
- El formulario debe incluir selección de ciclo formativo
- Los datos deben guardarse correctamente
- Al registrarse, se deben añadir automáticamente los módulos del ciclo al estudiante

## Tareas de Implementación

### Diseño y Planificación

- [ ] Diseñar el formulario de registro
- [ ] Definir campos necesarios (nombre, email, contraseña, ciclo formativo)
- [ ] Diseñar validaciones de formulario
- [ ] Crear mockup/wireframe

### Configuración Inicial

- [ ] Crear componente `RegisterForm`
- [ ] Crear página/ruta `/register`
- [ ] Configurar navegación a la página de registro

### Implementación del Formulario

- [ ] Crear campos del formulario:
  - [ ] Campo nombre (texto)
  - [ ] Campo email (email con validación)
  - [ ] Campo contraseña (password con validación)
  - [ ] Campo confirmar contraseña (password)
  - [ ] Selector de ciclo formativo
- [ ] Implementar validaciones:
  - [ ] Email válido
  - [ ] Contraseña con longitud mínima
  - [ ] Contraseñas coinciden
  - [ ] Campos obligatorios
- [ ] Añadir mensajes de error
- [ ] Aplicar estilos con Tailwind CSS
- [ ] Usar componentes de Shadcn/ui (Input, Button, Label)

### Lógica de Registro

- [ ] Implementar función de registro en el ORM
- [ ] Verificar que el email no existe ya
- [ ] Guardar usuario en LocalStorage
- [ ] Añadir automáticamente los módulos del ciclo al estudiante:
  - [ ] Obtener módulos del ciclo seleccionado
  - [ ] Crear `ModuloEstudiante` para cada módulo
  - [ ] Guardar módulos del estudiante en LocalStorage
- [ ] Generar ID único para el usuario

### Manejo de Errores

- [ ] Manejar error si el email ya existe
- [ ] Mostrar mensaje de error apropiado
- [ ] Manejar errores de validación

### Redirección

- [ ] Redirigir a página de login tras registro exitoso
- [ ] Mostrar mensaje de éxito (opcional)

### Persistencia de Datos

- [ ] Verificar que el usuario se guarda en LocalStorage
- [ ] Verificar que los módulos se añaden correctamente
- [ ] Verificar estructura de datos `ModuloEstudiante`

### Testing y Validación

- [ ] Probar registro con datos válidos
- [ ] Probar validaciones (email inválido, contraseñas no coinciden, etc.)
- [ ] Probar que no se puede registrar con email duplicado
- [ ] Verificar que los módulos se añaden automáticamente
- [ ] Verificar que se redirige correctamente
- [ ] Revisar código con la pareja

### Documentación

- [ ] Documentar componente y funciones
- [ ] Actualizar README si es necesario
- [ ] Crear commit con mensaje descriptivo

## Notas Técnicas

- Usar LocalStorage para almacenar usuarios
- Al crear el usuario, crear también los `ModuloEstudiante` correspondientes
- Estructura de `ModuloEstudiante` debe incluir notas y estado iniciales
- Considerar encriptar contraseñas (aunque sea básico para aprendizaje)

## Estimación

**Tiempo estimado**: 5-6 horas (M)

## Prioridad

Alta - Funcionalidad esencial del proyecto



---
[⬅️ Volver al Índice](./README.md) | [🏠 Volver al Inicio](../../README.md)
