import React , { useState} from "react";
import { Plus } from 'lucide-react';

export default function TaskForm({ onTaskCreated }) {
    const [ title, setTitle ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim()) {
            const newTask = {
                title: title.trim(),
                descripcion: '',
                completed: false
            }
            onTaskCreated(newTask);
            setTitle('');
        }
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Nueva Tarea</h2>
        <div className="flex gap-3">
            <input
                type="text"
                placeholder="¿Qué necesitas hacer?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                <Plus size={20} />
                Crear
            </button>
        </div>
        </div>
  );

}