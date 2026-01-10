import { getAuthHeaders } from "../helpers/authHelpers";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const taskService = {
    getAll: async() => {
        try {
            const response = await fetch(`${API_URL}/api/tasks`, {
                headers: getAuthHeaders()
            });

            if(!response.ok) throw new Error('Error al obtener las tareas');
            return await response.json();
        } catch(error) {
            console.error('Error:', error);
        }
    },

    create: async(taskData) => {
        try {

            const response = await fetch(`${API_URL}/api/tasks`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(taskData)
            });

            if(!response.ok) 
            throw new Error('Error al crear la tarea');
            return await response.json();
        } catch(error) {
            console.error('Error completo:', error);
            throw error;
        }
    },


    update: async(id, updateData) => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData)
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
            const response = await fetch(`${API_URL}/api/tasks/markAsCompleted/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders()
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
            const response = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error('Error al eliminar la tarea');
            return await response.json();
        } catch(error) {
            console.log('Error:', error);
            throw error;
        }
    }


};
