import { STORAGE_KEYS } from "../storage.js";

export const localStorageUsuarioRepo = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USUARIOS);
    return data ? JSON.parse(data) : [];
  },

  getById: (id) => {
    const usuarios = localStorageUsuarioRepo.getAll();
    return usuarios.find((u) => u.id === id);
  },

  getByEmail: (email) => {
    const usuarios = localStorageUsuarioRepo.getAll();
    return usuarios.find((u) => u.email === email);
  },

  create: (usuario) => {
    const usuarios = localStorageUsuarioRepo.getAll();
    const nuevoUsuario = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...usuario,
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
    return nuevoUsuario;
  },

  update: (id, datosActualizados) => {
    const usuarios = localStorageUsuarioRepo.getAll();
    const index = usuarios.findIndex((u) => u.id === id);

    if (index === -1) return undefined;

    usuarios[index] = { ...usuarios[index], ...datosActualizados };
    localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
    return usuarios[index];
  },

  delete: (id) => {
    const usuarios = localStorageUsuarioRepo.getAll();
    const nuevosUsuarios = usuarios.filter((u) => u.id !== id);

    if (usuarios.length === nuevosUsuarios.length) return false;

    localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(nuevosUsuarios));
    return true;
  },
};
