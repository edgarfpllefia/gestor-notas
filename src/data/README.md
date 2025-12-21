# Documentación de Datos Mock

## 📋 Descripción

Este directorio contiene la gestión de datos de la aplicación, incluyendo datos de ejemplo (mock data) para desarrollo y testing.

---

## 📂 Estructura de archivos

```
src/data/
├── mockData.ts           # Datos de ejemplo y funciones de inicialización
├── storage.ts            # Constantes para claves de LocalStorage
├── utils.ts              # Funciones helper generales
└── repositories/         # Repositorios para acceso a datos
    ├── usuarioRepository.js
    ├── moduloRepository.js
    ├── moduloEstudianteRepository.js
    └── tareaRepository.js
```

---

## 🗂️ mockData.ts

### Datos incluidos

El archivo `mockData.ts` contiene **datos de ejemplo** listos para usar:

| Tipo | Cantidad | Descripción |
|------|----------|-------------|
| **Usuarios** | 8 | 3 profesores + 5 estudiantes |
| **Módulos** | 29 | Distribuidos en 4 ciclos formativos |
| **Inscripciones** | 20 | Relaciones módulo-estudiante |
| **Tareas** | 14 | Asignadas a estudiantes |

### Detalle de usuarios

**Profesores:**
- María García Rodríguez (Informática) - ID: `1`
- Juan Martínez López (Electricidad) - ID: `2`
- Ana López Fernández (Robótica) - ID: `3`

**Estudiantes:**
- Edgar Fernández García (DAW, 2º año) - ID: `4`
- Laura Sánchez Martín (DAW, 1º año) - ID: `5`
- Carlos Ruiz Gómez (SMR, 1º año) - ID: `6`
- Sofía Moreno Torres (ARI, 1º año) - ID: `7`
- David Torres Pérez (IEA, 1º año) - ID: `8`

### Detalle de módulos por ciclo

**DAW (Desarrollo de Aplicaciones Web):** 8 módulos
- Bases de Datos
- Programación
- Lenguajes de Marcas
- Entornos de Desarrollo
- Desarrollo Web en Entorno Cliente
- Desarrollo Web en Entorno Servidor
- Diseño de Interfaces Web
- Despliegue de Aplicaciones Web

**ARI (Automatización y Robótica Industrial):** 7 módulos
- Sistemas Eléctricos y Electrónicos
- Elementos de Máquinas
- Diseño de Sistemas de Control
- Informática Industrial
- Sistemas Neumáticos y Oleohidráulicos
- Robótica Industrial
- Comunicaciones Industriales

**SMR (Sistemas Microinformáticos y Redes):** 7 módulos
- Montaje y Mantenimiento de Equipos
- Sistemas Operativos Monopuesto
- Aplicaciones Ofimáticas
- Redes Locales
- Sistemas Operativos en Red
- Seguridad Informática
- Servicios en Red

**IEA (Instalaciones Eléctricas y Automáticas):** 7 módulos
- Automatismos Industriales
- Electrónica
- Electrotecnia
- Instalaciones Eléctricas Interiores
- Instalaciones de Distribución
- Instalaciones Domóticas
- Instalaciones Solares Fotovoltaicas

---

## 🚀 Cómo usar los datos mock

### 1. Cargar datos en LocalStorage

```typescript
import { inicializarDatosMock } from './data/mockData';

// Cargar todos los datos de ejemplo
inicializarDatosMock();
```

Esto guardará en LocalStorage:
- 8 usuarios
- 29 módulos
- 20 inscripciones módulo-estudiante
- 14 tareas

### 2. Limpiar todos los datos

```typescript
import { limpiarDatos } from './data/mockData';

// Eliminar todos los datos de la aplicación
limpiarDatos();
```

### 3. Desde la consola del navegador

Abre DevTools (F12) → Console:

```javascript
// Cargar datos
import('./data/mockData.js').then(m => m.inicializarDatosMock());

// Limpiar datos
import('./data/mockData.js').then(m => m.limpiarDatos());
```

### 4. Con un botón en la UI

```tsx
import { inicializarDatosMock, limpiarDatos } from './data/mockData';

function AdminPanel() {
  return (
    <div>
      <button onClick={inicializarDatosMock}>
        Cargar Datos de Ejemplo
      </button>
      
      <button onClick={limpiarDatos}>
        Limpiar Todos los Datos
      </button>
    </div>
  );
}
```

### 5. Al iniciar la aplicación

```typescript
// main.tsx o App.tsx
import { inicializarDatosMock } from './data/mockData';

// Cargar datos automáticamente si LocalStorage está vacío
window.addEventListener('DOMContentLoaded', () => {
  const hayDatos = localStorage.getItem('usuarios');
  if (!hayDatos) {
    inicializarDatosMock();
    console.log('✅ Datos de ejemplo cargados');
  }
});
```

---

## 🔍 Verificar los datos

### Desde DevTools

1. Presiona **F12**
2. Ve a **Application** (Chrome) o **Storage** (Firefox)
3. En el menú izquierdo: **Local Storage** → tu dominio
4. Verás las claves:
   - `usuarios`
   - `modulos`
   - `modulosEstudiantes`
   - `tareas`

### Usando los repositorios

```typescript
import { localStorageUsuarioRepo } from './data/repositories/usuarioRepository';
import { localStorageModuloRepo } from './data/repositories/moduloRepository';
import { localStorageTareaRepo } from './data/repositories/tareaRepository';

// Obtener todos los usuarios
const usuarios = localStorageUsuarioRepo.getAll();
console.log('Usuarios:', usuarios.length); // 8

// Obtener un usuario por email
const edgar = localStorageUsuarioRepo.getByEmail('edgar.fernandez@alumno.es');
console.log('Edgar:', edgar);

// Obtener módulos de DAW
const modulosDAW = localStorageModuloRepo.getAll().filter(m => m.ciclo === 'DAW');
console.log('Módulos DAW:', modulosDAW.length); // 8

// Obtener tareas de Edgar
const tareasEdgar = localStorageTareaRepo.getByEstudianteId('4');
console.log('Tareas de Edgar:', tareasEdgar.length); // 4
```

---

## 📊 Ejemplos de datos

### Ejemplo de Usuario

```typescript
{
  id: "4",
  nombre: "Edgar Fernández García",
  email: "edgar.fernandez@alumno.es",
  rol: "estudiante",
  ciclo: "DAW"
}
```

### Ejemplo de Módulo

```typescript
{
  id: "5",
  codigo: "0373",
  nombre: "Desarrollo Web en Entorno Cliente",
  ciclo: "DAW",
  curso: 2,
  horas: 140,
  profesorId: "1",
  descripcion: "JavaScript, frameworks frontend y UX"
}
```

### Ejemplo de Tarea

```typescript
{
  id: "1",
  moduloId: "5",
  estudianteId: "4",
  titulo: "Crear componente React reutilizable",
  descripcion: "Desarrollar un componente de tarjeta (card) en React...",
  fechaCreacion: "2025-01-05",
  fechaEntrega: "2025-01-15",
  estado: "pendiente",
  prioridad: "alta"
}
```

### Ejemplo de Inscripción

```typescript
{
  id: "1",
  estudianteId: "4",
  moduloId: "5",
  fechaInscripcion: "2024-09-01"
}
```

---

## ⚠️ Notas importantes

### Persistencia de datos
- Los datos se guardan en **LocalStorage** del navegador
- **Persisten** aunque cierres el navegador
- Son específicos del **dominio** (no se comparten entre sitios)

### Limitaciones
- **Capacidad**: ~5-10 MB dependiendo del navegador
- **Seguridad**: NO usar para datos sensibles (contraseñas, tokens)
- **Solo strings**: Los objetos se convierten con `JSON.stringify()`

### Reset de datos

Si quieres empezar de cero:

```typescript
limpiarDatos();           // Borra todo
inicializarDatosMock();   // Carga datos frescos
```

O desde DevTools:
1. Application → Local Storage → Clic derecho → Clear

---

## 🔗 Archivos relacionados

- **storage.ts**: Define las constantes `STORAGE_KEYS` para las claves de LocalStorage
- **repositories/**: Implementan el patrón Repository para acceder a los datos
- **utils.ts**: Funciones helper generales de la aplicación

---

## 📝 Mantenimiento

Para añadir más datos mock:

1. Edita los arrays en `mockData.ts`:
   - `mockUsuarios`
   - `mockModulos`
   - `mockModulosEstudiantes`
   - `mockTareas`

2. Respeta el formato de IDs (strings numéricos: `"1"`, `"2"`, etc.)

3. Asegúrate de que las referencias sean correctas:
   - `profesorId` debe existir en `mockUsuarios`
   - `moduloId` debe existir en `mockModulos`
   - `estudianteId` debe existir en `mockUsuarios`

---

## 🐛 Troubleshooting

**Problema**: Los datos no se cargan
- **Solución**: Verifica la consola (F12) en busca de errores
- **Solución**: Asegúrate de llamar a `inicializarDatosMock()`

**Problema**: Los datos persisten después de `limpiarDatos()`
- **Solución**: Comprueba que las claves en `STORAGE_KEYS` sean correctas
- **Solución**: Usa `localStorage.clear()` para borrar TODO (cuidado: borra todo LocalStorage)

**Problema**: Error "Cannot find module"
- **Solución**: Verifica que las rutas de import usen `./` para archivos locales
- **Solución**: En TypeScript, las importaciones deben usar `.js` aunque los archivos sean `.ts`

---

**Creado por:** Edgar Fernández  
**Última actualización:** 21/12/2025
