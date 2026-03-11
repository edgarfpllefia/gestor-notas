import { api } from './client';

export const moduloEstudianteApi = {
    getByEstudianteId: (estudianteId: string) =>
        api.get(`/estudiantes/${estudianteId}/modulos`),

    getDetalle: (estudianteId: string, moduloId: string) =>
        api.get(`/estudiantes/${estudianteId}/modulos/${moduloId}`),

    update: (estudianteId: string, moduloId: string, datos: { estado?: string, notas?: any }) =>
        api.put(`/estudiantes/${estudianteId}/modulos/${moduloId}`, datos),
};