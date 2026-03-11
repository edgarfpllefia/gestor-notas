import { api } from './client';

export const authApi = {
    login: async (email: string, password: string) => {
        const data = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        return data;
    },

    register: async (datos: { email: string, password: string, nombre: string, ciclo?: string, curso?: number }) => {
        return api.post('/auth/register', datos);
    },

    logout: async () => {
        try {
            await api.post('/auth/logout', {});
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    me: async () => {
        const data = await api.get('/auth/me');
        return data.usuario;
    }
};