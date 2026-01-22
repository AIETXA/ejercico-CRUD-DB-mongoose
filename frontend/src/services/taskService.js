import { getAuthHeaders } from "../helpers/authHelpers";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const taskService = {
    getAll: async(filters = {}) => {
        try {
            const params =  new URLSearchParams();

            if(filters.folder) params.append('folder', filters.folder);
            if(filters.priority) params.append('priority', filters.priority);
            if(filters.completed !== undefined) params.append('completed', filters.completed);
            if(filters.postponed !== undefined) params.append('postponed', filters.postponed);
            if(filters.date) params.append('date', filters.date);

            const queryString = params.toString();
            const url = queryString ? `${API_URL}/api/tasks?${queryString}` : `${API_URL}/api/tasks`;
            
            const response = await fetch(url, {
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
