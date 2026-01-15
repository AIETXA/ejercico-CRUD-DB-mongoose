

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const authService = {
    register: async(userData) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Error al registrarse');
            }

            if(data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return data;
            } catch(error) {
                console.error('Error al registrarse', error);
                throw error;
            }
    },

    login: async(credentials) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            if(data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return data;
        } catch(error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    logout: async() => {
        try {
            const token = localStorage.getItem('token');

            if(token) {
                await fetch(`${API_URL}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch(error) {
            console.error('Error en logout', error);

            localStorage.removeItem('token');
            localStorage.removeItem('user');

        }
    },

    verifyToken: async() => {
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                return null;
            }

            const response = await fetch(`${API_URL}/api/auth/verify`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            const data = await response.json();

            if(!response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return null;
            }

            return data;
        } catch(error) {
            console.error('Error en la verificacion del token', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return null;
        }
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}