import React from "react";
import { Trash2, Edit, Check, X } from 'lucide-react';

export default function TaskList({tasks, onEdit, onDelete, onToggleComplete}) {
    if(!tasks || tasks.length === 0) {
        return(
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500 text-lg">Aún no hay tareas. ¡Crea tu primera tarea!</p>
            </div>
        );
    }

    return(
        <div className="space-y-4">
            {tasks.map((task) => (
                <div 
                key={task._id} 
                className={`bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
                        task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
                    }`}
                >
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <button
                        onClick={() => onToggleComplete(task._id, !task.completed)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        task.completed
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-gray-300 hover:border-green-500'
                                    }`}>
                        {task.completed && <Check size={16} className="text-white" />}
                    </button>

                    <h3
                        className={`text-lg font-semibold ${
                                        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                                    }`}
                    >
                        {task.title}
                    </h3>    
                </div>
                {task.description && (
                    <p className="text-gray-600 ml-9">{task.description}</p>
                )}
            </div>

             <div className="flex gap-2">
                <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar tarea"
                >
                    <Edit size={20} />
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar tarea"
                >
                    <Trash2 size={20} />
                </button>
            </div>
            </div>
            <div className="mt-3 ml-9">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        task.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                    }`}
                >
                    {task.completed ? 'Completada' : 'Pendiente'}
                </span>
            </div>
            </div>


            ))}
        </div>
    );
}