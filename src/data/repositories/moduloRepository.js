import { STORAGE_KEYS } from "../storage.js";

export const localStorageModuloRepo = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.MODULOS);
    return data ? JSON.parse(data) : [];
  },

  getById: (id) => {
    const modulos = localStorageModuloRepo.getAll();
    return modulos.find((m) => m.id === id);
  },

  create: (modulo) => {
    const modulos = localStorageModuloRepo.getAll();
    const nuevoModulo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...modulo,
    };
    modulos.push(nuevoModulo);
    localStorage.setItem(STORAGE_KEYS.MODULOS, JSON.stringify(modulos));
    return nuevoModulo;
  },

  update: (id, datosActualizados) => {
    const modulos = localStorageModuloRepo.getAll();
    const index = modulos.findIndex((m) => m.id === id);

    if (index === -1) return undefined;

    modulos[index] = { ...modulos[index], ...datosActualizados };
    localStorage.setItem(STORAGE_KEYS.MODULOS, JSON.stringify(modulos));
    return modulos[index];
  },

  delete: (id) => {
    const modulos = localStorageModuloRepo.getAll();
    const nuevosModulos = modulos.filter((m) => m.id !== id);

    if (modulos.length === nuevosModulos.length) return false;

    localStorage.setItem(STORAGE_KEYS.MODULOS, JSON.stringify(nuevosModulos));
    return true;
  },
};
