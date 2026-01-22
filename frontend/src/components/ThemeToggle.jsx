import React from "react";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "../hooks/ThemeContext";

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors"
            title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
            {isDark ? (
                <Sun size={20} className="text-yellow-400"/>
            ):(
                <Moon size={20} className="text-slate-300"/>
            )}

        </button>
    );
}