import React from "react";
import { Trash2, Edit, Check, Bell, AlertCircle, Minus, Circle } from 'lucide-react';

export default function TaskList({tasks, onEdit, onDelete, onToggleComplete}) {
    if(!tasks || tasks.length === 0) {
        return(
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500 text-lg">Aún no hay tareas. ¡Crea tu primera tarea!</p>
            </div>
        );
    }

const getPriorityConfig = (priority) => {
    switch(priority) {
        case 'high':
            return {
                icon: AlertCircle,
                color: 'text-[#EF4444]',
                bg: 'bg-red-100',
                border: 'border-red-500',
                label: 'Alta'
            };
        case 'low':
            return {
                icon: Circle,
                color:'text-green-600',
                bg:'bg-green-100',
                border:'border-green-500',
                label: 'Baja'
            };
        default:
            return {
                icon: Minus,
                color: 'text-yellow-600',
                bg: 'bg-yellow-100',
                border: 'border-yellow-500',
                label: 'Media'
            };       
    }
};


    return(


        <div className="space-y-4">
            {tasks.map((task) => {
                const priorityConfig = getPriorityConfig(task.priority);
                const PriorityIcon = priorityConfig.icon;
            
            
        return (
                <div 
                key={task._id} 
                className={`bg-slate-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
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

                    {task.reminderDate && (
                        <div className="relative group">
                            <Bell className="w-5 h-5 text-yellow-500 cursor-pointer"/>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">                                <div className="text-xs font-semibold mb-1">Recordatorio:</div>
                              <div className="text-xs mb-1 flex items-center gap-2">
                                    <span>📆</span>
                                    <span>
                                    {new Date(task.reminderDate).toLocaleDateString('es-ES', { 
                                        weekday: 'short',
                                        day: '2-digit', 
                                        month: 'short', 
                                        year: 'numeric' 
                                    })}
                                    </span>
                                </div>
                                <div className="text-xs flex items-center gap-2">
                                    <span>🕐</span>
                                    <span>{new Date(task.reminderDate).toLocaleTimeString('es-ES', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}</span>
                                </div>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>    
                        
                    )}

                {task.description && (
                    <p className="text-gray-600 ml-9">{task.description}</p>

                )}
           
            </div>

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
            <div className="mt-3 ml-9 items-center gap-2">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        task.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                    }`}
                >
                    {task.completed ? 'Completada' : 'Pendiente'}
                </span>

                {!task.completed && (
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                        <PriorityIcon size={14} />
                        {priorityConfig.label}
                    </span>
                )}    

              
            </div>

            </div>


            );
            })}
        </div>
    );
}