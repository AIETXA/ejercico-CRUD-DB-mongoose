import React, { useState, useEffect } from "react";
import { X, Circle, Minus, Bell, AlertCircle } from "lucide-react";

export default function EditTaskModal ({ task, isOpen, onClose, onSave }) {
    const [ title, setTitle ] = useState('');
    const [ reminderDate, setReminderDate ] = useState('');
    const [ priority, setPriority ] = useState('medium');

    const priorities = [
        { value: 'high', label: 'Alta', color: 'red', icon: AlertCircle },
        { value: 'medium', label: 'Media', color: 'amber', icon: Minus },
        { value: 'low', label: 'Baja', color: 'emerald', icon: Circle }
    ];

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setReminderDate(task.reminderDate ? task.reminderDate.slice(0,16): '');
            setPriority(task.priority || 'medium');
        }
    }, [task]);

    const handleSubmit = () => {
        if(title.trim()) {
            onSave({
                ...task,
                title: title.trim(),
                reminderDate: reminderDate || null,
                priority: priority
            });
            onClose();
        }
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit();
        }
    };

    if(!isOpen || !task) return null;

    return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl shadow-[0_0_10px_rgba(59,130,246,0.5)]  max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">Editar Tarea</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                
                <div className="p-6 space-y-6">
                   
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Título de la tarea
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyUp={handleKeyPress}
                            placeholder="¿Qué necesitas hacer?"
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                            autoFocus
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Prioridad
                        </label>
                        <div className="flex gap-3">
                            {priorities.map((p) => {
                                const Icon = p.icon;
                                const isSelected = priority === p.value;
                                return (
                                    <button
                                        key={p.value}
                                        type="button"
                                        onClick={() => setPriority(p.value)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                                            isSelected
                                                ? p.color === 'red'
                                                    ? 'bg-red-500/20 text-red-400 ring-2 ring-red-500'
                                                    : p.color === 'amber'
                                                    ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500'
                                                    : 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500'
                                                : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Bell size={18} />
                            Recordatorio (opcional)
                        </label>
                        <input
                            type="datetime-local"
                            value={reminderDate}
                            onChange={(e) => setReminderDate(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        />
                    </div>

                   
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}