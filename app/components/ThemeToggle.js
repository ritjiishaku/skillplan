'use client';

import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={`theme-toggle ${className}`} onClick={toggleTheme} aria-label="Toggle dark/light mode">
      {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
