# Flujo de Datos

## 📋 Descripción General

Este documento explica cómo fluyen los datos en la aplicación, desde su inicialización hasta su uso en la interfaz.

---

## 🗄️ Almacenamiento

### LocalStorage

Los datos se almacenan en **LocalStorage** del navegador con las siguientes claves:

| Clave                | Contenido                                |
| -------------------- | ---------------------------------------- |
| `usuarios`           | Array de objetos Usuario (JSON)          |
| `modulos`            | Array de objetos Módulo (JSON)           |
| `modulosEstudiantes` | Array de objetos ModuloEstudiante (JSON) |
| `tareas`             | Array de objetos Tarea (JSON)            |

**Ubicación:** Definidas en `src/data/storage.ts` como `STORAGE_KEYS`

---

## 🔄 Flujo Completo de Datos

### 1️⃣ Inicialización (Carga de Datos Mock)

```
┌─────────────────┐
│  mockData.ts    │
│                 │
│ - mockUsuarios  │
│ - mockModulos   │
│ - mockModulos-  │
│   Estudiantes   │
│ - mockTareas    │
└────────┬────────┘
         │
         │ inicializarDatosMock()
         │
         ↓
┌─────────────────┐
│ JSON.stringify()│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  LocalStorage   │
│                 │
│ usuarios: "[...]"
│ modulos: "[...]"
│ ...             │
└─────────────────┘
```

**Código:**

```javascript
// En mockData.ts
export function inicializarDatosMock() {
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(mockUsuarios));
  localStorage.setItem(STORAGE_KEYS.MODULOS, JSON.stringify(mockModulos));
  localStorage.setItem(
    STORAGE_KEYS.MODULOS_ESTUDIANTES,
    JSON.stringify(mockModulosEstudiantes)
  );
  localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(mockTareas));
}
```

---

### 2️⃣ Lectura de Datos (READ)

```
┌──────────────┐
│      UI      │
└──────┬───────┘
       │ Solicita datos
       │
       ↓
┌──────────────────────┐
│    Repository        │
│ (ej: usuarioRepo)    │
│                      │
│  getAll()            │
│  getById(id)         │
│  getByEmail(email)   │
└──────┬───────────────┘
       │
       │ localStorage.getItem()
       │
       ↓
┌──────────────────────┐
│   LocalStorage       │
│                      │
│   "usuarios": "[...]"│
└──────┬───────────────┘
       │
       │ Devuelve string JSON
       │
       ↓
┌──────────────────────┐
│   JSON.parse()       │
└──────┬───────────────┘
       │
       │ Devuelve Array
       │
       ↓
┌──────────────┐
│      UI      │ ← Recibe datos
└──────────────┘
```

**Código:**

```javascript
// En usuarioRepository.js
getAll: () => {
  const data = localStorage.getItem(STORAGE_KEYS.USUARIOS);
  return data ? JSON.parse(data) : [];
};
```

---

### 3️⃣ Creación de Datos (CREATE)

```
┌──────────────┐
│      UI      │
│ (formulario) │
└──────┬───────┘
       │ Datos nuevos
       │ { nombre: "Ana", email: "..." }
       │
       ↓
┌──────────────────────┐
│    Repository        │
│                      │
│  create(usuario)     │
└──────┬───────────────┘
       │
       │ 1. Obtiene datos actuales
       │ 2. Genera nuevo ID
       │ 3. Añade nuevo elemento
       │
       ↓
┌──────────────────────┐
│    generarId()       │
│    (en utils.ts)     │
└──────┬───────────────┘
       │
       │ ID único generado
       │ "1734812456789abc"
       │
       ↓
┌──────────────────────┐
│  Nuevo objeto        │
│  {                   │
│    id: "173481...",  │
│    nombre: "Ana",    │
│    email: "..."      │
│  }                   │
└──────┬───────────────┘
       │
       │ JSON.stringify()
       │
       ↓
┌──────────────────────┐
│   LocalStorage       │
│                      │
│   localStorage       │
│   .setItem()         │
└──────┬───────────────┘
       │
       ↓
┌──────────────┐
│      UI      │ ← Recibe objeto creado
└──────────────┘
```

**Código:**

```javascript
// En usuarioRepository.js
create: (usuario) => {
  const usuarios = localStorageUsuarioRepo.getAll();
  const nuevoUsuario = {
    id: generarId(),
    ...usuario,
  };
  usuarios.push(nuevoUsuario);
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  return nuevoUsuario;
};
```

---

### 4️⃣ Actualización de Datos (UPDATE)

```
┌──────────────┐
│      UI      │
└──────┬───────┘
       │ ID + cambios
       │ ("4", { nombre: "Edgar García" })
       │
       ↓
┌──────────────────────┐
│    Repository        │
│                      │
│  update(id, datos)   │
└──────┬───────────────┘
       │
       │ 1. Obtiene todos
       │ 2. Busca por ID
       │ 3. Actualiza
       │
       ↓
┌──────────────────────┐
│  Array.findIndex()   │
│  Spread operator     │
│  {...old, ...new}    │
└──────┬───────────────┘
       │
       │ JSON.stringify()
       │
       ↓
┌──────────────────────┐
│   LocalStorage       │
│                      │
│   Sobrescribe todo   │
└──────┬───────────────┘
       │
       ↓
┌──────────────┐
│      UI      │ ← Recibe objeto actualizado
└──────────────┘
```

**Código:**

```javascript
// En usuarioRepository.js
update: (id, datosActualizados) => {
  const usuarios = localStorageUsuarioRepo.getAll();
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) return undefined;

  usuarios[index] = { ...usuarios[index], ...datosActualizados };
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  return usuarios[index];
};
```

---

### 5️⃣ Eliminación de Datos (DELETE)

```
┌──────────────┐
│      UI      │
└──────┬───────┘
       │ ID a eliminar
       │ "4"
       │
       ↓
┌──────────────────────┐
│    Repository        │
│                      │
│  delete(id)          │
└──────┬───────────────┘
       │
       │ 1. Obtiene todos
       │ 2. Filtra (elimina)
       │
       ↓
┌──────────────────────┐
│  Array.filter()      │
│  (excluye el ID)     │
└──────┬───────────────┘
       │
       │ JSON.stringify()
       │
       ↓
┌──────────────────────┐
│   LocalStorage       │
│                      │
│   Guarda sin el      │
│   elemento borrado   │
└──────┬───────────────┘
       │
       ↓
┌──────────────┐
│      UI      │ ← Recibe true/false
└──────────────┘
```

**Código:**

```javascript
// En usuarioRepository.js
delete: (id) => {
  const usuarios = localStorageUsuarioRepo.getAll();
  const nuevosUsuarios = usuarios.filter((u) => u.id !== id);

  if (usuarios.length === nuevosUsuarios.length) return false;

  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(nuevosUsuarios));
  return true;
}
```

---

## 🔧 Funciones Auxiliares

### readLocalStorage() - En utils.ts

```javascript
export const readLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return [];
  }
};
```

**Uso:** Lectura segura con manejo de errores

---

### writeLocalStorage() - En utils.ts

```javascript
export const writeLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
};
```

**Uso:** Escritura segura con manejo de errores

---

### generarId() - En utils.ts

```javascript
export const generarId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
```

**Uso:** Generar IDs únicos para nuevos registros

**Resultado:** String único (ej: `"1734812456789k7f3g2h9j"`)

---

## 📦 Patrón Repository

### ¿Qué es?

Los **repositories** son objetos que centralizan todas las operaciones de acceso a datos de una entidad.

### Estructura

```javascript
export const localStorageUsuarioRepo = {
  getAll: () => {
    /* ... */
  },
  getById: (id) => {
    /* ... */
  },
  getByEmail: (email) => {
    /* ... */
  }, // Método específico
  create: (usuario) => {
    /* ... */
  },
  update: (id, datos) => {
    /* ... */
  },
  delete: (id) => {
    /* ... */
  },
};
```

### Ventajas

✅ **Centralización:** Todo el acceso a datos en un solo lugar  
✅ **Reutilización:** No repites código  
✅ **Mantenibilidad:** Cambios en un solo sitio  
✅ **Abstracción:** La UI no sabe que usa LocalStorage

---

## 🔄 Ciclo de Vida Completo

### Ejemplo: Crear una nueva tarea

```
1. Usuario rellena formulario en UI
   ↓
2. UI llama: tareaRepository.create({ titulo: "...", ... })
   ↓
3. Repository:
   - Obtiene tareas actuales (getAll)
   - Genera ID único (generarId)
   - Crea objeto completo
   - Guarda en LocalStorage (setItem)
   ↓
4. Repository devuelve la tarea creada a UI
   ↓
5. UI actualiza la vista con la nueva tarea
```

---

## 🗑️ Limpieza de Datos

### limpiarDatos() - En mockData.ts

```javascript
export function limpiarDatos() {
  localStorage.removeItem(STORAGE_KEYS.USUARIOS);
  localStorage.removeItem(STORAGE_KEYS.MODULOS);
  localStorage.removeItem(STORAGE_KEYS.MODULOS_ESTUDIANTES);
  localStorage.removeItem(STORAGE_KEYS.TAREAS);
}
```

**Uso:** Eliminar todos los datos de la aplicación

---

## ⚠️ Consideraciones Importantes

### Limitaciones de LocalStorage

- **Capacidad:** ~5-10 MB
- **Tipo de datos:** Solo strings (por eso usamos JSON.stringify/parse)
- **Sincronía:** Operaciones síncronas (bloquean el hilo principal)
- **Seguridad:** NO usar para datos sensibles

### Manejo de Errores

Todas las operaciones usan `try-catch` para:

- Evitar que la app se rompa
- Devolver valores por defecto (arrays vacíos)
- Registrar errores en consola

### Persistencia

Los datos en LocalStorage:

- ✅ Persisten al cerrar el navegador
- ✅ Persisten al recargar la página
- ❌ Se borran si el usuario limpia datos del navegador
- ❌ NO se sincronizan entre pestañas automáticamente

---

**Última actualización:** 22/12/2025
