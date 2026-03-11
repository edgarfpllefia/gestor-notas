import { api } from './client';

export const tareasApi = {
    getByModuloEstudiante: (estudianteId: string, moduloId: string) =>
        api.get(`/estudiantes/${estudianteId}/modulos/${moduloId}/tareas`),

    getById: (id: string) => api.get(`/tareas/${id}`),

    create: (estudianteId: string, moduloId: string, datos: any) =>
        api.post(`/estudiantes/${estudianteId}/modulos/${moduloId}/tareas`, datos),

    update: (id: string, datos: any) => api.put(`/tareas/${id}`, datos),

    delete: (id: string) => api.delete(`/tareas/${id}`),
};