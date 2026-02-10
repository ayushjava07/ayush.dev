import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeSelector = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-full border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400/50 dark:hover:border-indigo-400/50 transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/10 shadow-sm dark:shadow-none"
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeSelector;
