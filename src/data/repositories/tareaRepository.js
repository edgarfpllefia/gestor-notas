import { STORAGE_KEYS } from "../storage.js";

export const localStorageTareaRepo = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.TAREAS);
    return data ? JSON.parse(data) : [];
  },

  getById: (id) => {
    const tareas = localStorageTareaRepo.getAll();
    return tareas.find((t) => t.id === id);
  },

  getByModuloId: (moduloId) => {
    const tareas = localStorageTareaRepo.getAll();
    return tareas.filter((t) => t.moduloId === moduloId);
  },

  getByEstudianteId: (estudianteId) => {
    const tareas = localStorageTareaRepo.getAll();
    return tareas.filter((t) => t.estudianteId === estudianteId);
  },

  create: (tarea) => {
    const tareas = localStorageTareaRepo.getAll();
    const nuevaTarea = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...tarea,
    };
    tareas.push(nuevaTarea);
    localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(tareas));
    return nuevaTarea;
  },

  update: (id, datosActualizados) => {
    const tareas = localStorageTareaRepo.getAll();
    const index = tareas.findIndex((t) => t.id === id);

    if (index === -1) return undefined;

    tareas[index] = { ...tareas[index], ...datosActualizados };
    localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(tareas));
    return tareas[index];
  },

  delete: (id) => {
    const tareas = localStorageTareaRepo.getAll();
    const nuevasTareas = tareas.filter((t) => t.id !== id);

    if (tareas.length === nuevasTareas.length) return false;

    localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(nuevasTareas));
    return true;
  },
};
