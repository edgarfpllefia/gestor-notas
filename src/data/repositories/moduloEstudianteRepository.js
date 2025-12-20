import { STORAGE_KEYS } from "../storage.js";

export const localStorageModuloEstudianteRepo = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.MODULOS_ESTUDIANTES);
    return data ? JSON.parse(data) : [];
  },

  getById: (id) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    return relaciones.find((r) => r.id === id);
  },

  getByEstudianteId: (estudianteId) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    return relaciones.filter((r) => r.estudianteId === estudianteId);
  },

  getByModuloId: (moduloId) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    return relaciones.filter((r) => r.moduloId === moduloId);
  },

  create: (relacion) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    const nuevaRelacion = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...relacion,
    };
    relaciones.push(nuevaRelacion);
    localStorage.setItem(
      STORAGE_KEYS.MODULOS_ESTUDIANTES,
      JSON.stringify(relaciones)
    );
    return nuevaRelacion;
  },

  update: (id, datosActualizados) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    const index = relaciones.findIndex((r) => r.id === id);

    if (index === -1) return undefined;

    relaciones[index] = { ...relaciones[index], ...datosActualizados };
    localStorage.setItem(
      STORAGE_KEYS.MODULOS_ESTUDIANTES,
      JSON.stringify(relaciones)
    );
    return relaciones[index];
  },

  delete: (id) => {
    const relaciones = localStorageModuloEstudianteRepo.getAll();
    const nuevasRelaciones = relaciones.filter((r) => r.id !== id);

    if (relaciones.length === nuevasRelaciones.length) return false;

    localStorage.setItem(
      STORAGE_KEYS.MODULOS_ESTUDIANTES,
      JSON.stringify(nuevasRelaciones)
    );
    return true;
  },
};
