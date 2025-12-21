const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const taskService = {
    getAll: async() => {
        try {
            const response = await fetch(`${API_URL}/`);
            if(!response.ok) throw new Error('Error al obtener las tareas');
            return await response.json();
        } catch(error) {
            console.error('Error:', error);
        }
    },

    create: async(title) => {
        try {
            const response = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            });
            if(!response.ok) throw new Error('Error al crear la tarea');
            return await response.json();
        } catch(error) {
            console.error('Error:', error);
            throw error;
        }
    },

    update: async(id, title) => {
        try {
            const response = await fetch(`${API_URL}/id/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({title})
            });
            if(!response.ok) throw new Error('Error al actualizar la tarea');
            return await response.json();
        } catch(error) {
            console.error('Error:', error);
            throw error;
        }
    },

    toggleComplete: async (id) => {
        try {
            const response = await fetch(`${API_URL}/markAsCompleted/${id}`, {
                method: 'PUT'
            });
            if (!response.ok) throw new Error ('Error al actualizar el estado');
            return await response.json();
        } catch(error) {
            console.error('Error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${API_URL}/id/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la tarea');
            return await response.json();
        } catch(error) {
            console.log('Erros:', error);
            throw error;
        }
    }


};
