import { api } from './client';

export const modulosApi = {
    getAll: (ciclo?: string, curso?: number) => {
        const params = new URLSearchParams();
        if (ciclo) params.append('ciclo', ciclo);
        if (curso) params.append('curso', curso.toString());
        const query = params.toString();
        return api.get(`/modulos${query ? '?' + query : ''}`);
    },

    getById: (id: string) => api.get(`/modulos/${id}`),

    create: (datos: { nombre: string, ciclo: string, curso: number, codigo?: string, horas?: number, descripcion?: string }) =>
        api.post('/modulos', datos),

    update: (id: string, datos: any) => api.put(`/modulos/${id}`, datos),

    delete: (id: string) => api.delete(`/modulos/${id}`),

    getByCiclo: (ciclo: string) => api.get(`/modulos?ciclo=${ciclo}`),
};