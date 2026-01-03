import React , { useState} from "react";
import { Plus, Bell, AlertCircle, Circle, Minus, icons } from 'lucide-react';

export default function TaskForm({ onTaskCreated }) {
    const [ title, setTitle ] = useState('');
    const [ reminderDate, setReminderDate ] = useState('');
    const [ priority, setPriority ] = useState('medium');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim()) {
            const newTask = {
                title: title.trim(),
                descripcion: '',
                completed: false,
                reminderDate: reminderDate||null,
                priority: priority
            }
            onTaskCreated(newTask);
            setTitle('');
            setReminderDate('');
            setPriority('medium');
        }
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const priorities = [
        { value: 'high', label: 'Alta', color: 'red', icon: AlertCircle },
        { value: 'medium', label: 'Media', color: 'amber', icon: Minus },
        { value: 'low', label: 'Baja', color: 'emerald', icon: Circle }
    ];

    return (
        <div className="bg-slate-900 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Nueva Tarea</h2>
        
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="¿Qué necesitas hacer?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyUp={handleKeyPress}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />

            <div className="flex gap-4 flex-wrap items-center">

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-3 font-medium">Prioridad:</span>
                    <div className="flex gap-2">
                        {priorities.map((p) => {
                            const Icon = p.icon;
                            const isSelected = priority === p.value;
                            return (
                                <button
                                key={p.value}
                                type="button"
                                onClick={() => setPriority(p.value)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                                    isSelected
                                        ? p.color === 'red'
                                            ? 'bg-red-500/20 text-red-400 ring-2 ring-red-500'
                                            : p.color === 'amber'
                                            ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500'
                                            : 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500'
                                        : 'bg-slate-700 text-gray-400 hover:bg-slate-600'    
                                }`}
                                >
                                   <Icon size={16}/>
                                   {p.label} 
                                </button>
                            );
                        })}
                    </div>
                </div>








            <div className="flex items-center gap-4 flex-wrap">
                <Bell size={20} className="text-gray-300"/>
                <label className="text-sm text-gray-300 font-medium">
                    Recordatorio (opcional):
                </label>
                <input
                    type="datetime-local"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-[#8A10D1] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                <Plus size={20} />
                Crear
            </button>
        </div>
        </div>
    </div>
  );

}