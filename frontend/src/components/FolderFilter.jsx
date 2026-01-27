import React from "react";
import { Folders, Briefcase, Home, AlertCircle, Archive, Calendar, CheckCircle, Clock } from 'lucide-react';

const folderGroups = [

    {
        title: 'Temporal',
        items: [
            { value: 'today', label:'Hoy', icon: Calendar, color: 'text-yellow-400' },
            { value: 'week', label:'Semana', icon: Folders, color: 'text-cyan-400' },
            { value: 'month', label:'Mes', icon: Archive, color: 'text-blue-400'},
        ],
    },

    {
        title: 'Contexto',
        items: [
            { value: 'personal', label:'Personal', icon: Home, color: 'text-orange-400' },
            { value: 'work', label:'Trabajo', icon: Briefcase, color: 'text-purple-400' },
        ],
    },

    {
        title: 'Especiales',
        items: [
            { value: 'priority', label:'Prioritarias', icon: AlertCircle, color: 'text-red-400' },
            { value: 'postponed', label: 'Pospuestas', icon: Clock, color: 'text-amber-400'},
            { value: 'completed', label: 'Completadas', icon: CheckCircle, color:'text-green-400'},
        ],
    },



];

export default function FolderFilter({ selectedFolder, onSelectFolder }) {
   return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
       <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        📁 Archivadores
        </h3>

        <div className="space-y-4">
            {folderGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              {group.title}
              </p>
        
        <div className="flex flex-wrap gap-2">
            {group.items.map((folder) => {
                const Icon = folder.icon;
                const isSelected = selectedFolder === folder.value;

                return (
                    <button
                        key={folder.value}
                        onClick={() => onSelectFolder(folder.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            isSelected
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-600'

                            
                        }`}
                    >
                        {Icon && (
                            <Icon size={16} className={isSelected ? 'text-white' : folder.color} />
                            
                        )}
                        {folder.label}


                        </button>
                );
            })}
        </div> 
    </div>
   ))}
   </div>
   </div>
   );
}