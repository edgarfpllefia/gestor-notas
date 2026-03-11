import { api } from './client';

export const usuariosApi = {
    getAll: (filtros?: { rol?: string, ciclo?: string }) => {
        const params = new URLSearchParams();
        if (filtros?.rol) params.append('rol', filtros.rol);
        if (filtros?.ciclo) params.append('ciclo', filtros.ciclo);
        const query = params.toString();
        return api.get(`/usuarios${query ? '?' + query : ''}`);
    },

    getById: (id: string) => api.get(`/usuarios/${id}`),

    getEstudiantesByCiclo: (ciclo: string) => api.get(`/usuarios?rol=estudiante&ciclo=${ciclo}`),
};