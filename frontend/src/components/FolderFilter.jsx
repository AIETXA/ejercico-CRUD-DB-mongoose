import React from "react";
import { Folder, Briefcase, Home, Star, Archive } from 'lucide-react';

const folders = [
    { value: 'today', label:'Hoy', icon: Archive, color: 'text-blue-400' },
    { value: 'week', label:'Esta semana', icon: Folder, color: 'text-gray-400' },
    { value: 'work', label:'Trabajo', icon: Briefcase, color: 'text-purple-400' },
    { value: 'personal', label:'Personal', icon: Home, color: 'text-green-400' },
    { value: 'all', label:'Todas', icon: Star, color: 'text-red-400' },
];

export default function FolderFilter({ selectedFolder, onSelectFolder }) {
   return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
       <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        📁 Carpetas
        </h3>
        <div className="flex flex-wrap gap-2">
            {folders.map((folder) => {
                const Icon = folder.icon;
                const isSelected = selectedFolder === folder.value;

                return (
                    <button
                        key={folder.value}
                        onClick={() => onSelectFolder(folder.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            isSelected
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover-bg-slate-600'

                            
                        }`}
                    >
                        <Icon size={16} className={isSelected ? 'text-white' : folder.color} />
                        {folder.label}


                        </button>
                );
            })}
        </div> 
    </div>
   ) ;
}