import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-void/5 dark:hover:bg-surface/10 transition-colors duration-200 flex items-center justify-center text-text-muted dark:text-text-secondary"
            aria-label="Toggle theme"
        >
            <span className="material-icons">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default ThemeToggle;
