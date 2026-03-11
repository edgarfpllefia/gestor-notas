const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
    'Content-Type': 'application/json',
    ...(getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {})
});

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en la petición');
    return data;
};

export const api = {
    get: (path) => fetch(`${API_URL}${path}`, { headers: headers() }).then(handleResponse),
    post: (path, body) => fetch(`${API_URL}${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
    put: (path, body) => fetch(`${API_URL}${path}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
    delete: (path) => fetch(`${API_URL}${path}`, { method: 'DELETE', headers: headers() }).then(handleResponse),
};