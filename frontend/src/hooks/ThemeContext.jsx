import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [ isDark, setIsDark ] = useState(() => {

        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || savedTheme === null;
    });

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if(isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useTheme debe usarse dentro de ThemeProvider');

    }
    return context;
};