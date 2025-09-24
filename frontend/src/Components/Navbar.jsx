import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const linkBase = 'px-4 py-2 rounded-lg font-medium transition-colors';

  // Initialize dark mode on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme !== null ? JSON.parse(savedTheme) : systemDark;
    
    setIsDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
      document.body.style.color = '#f3f4f6';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111827';
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    applyTheme(newDarkMode);
  };

  return (
    <nav 
      className="w-full border-b sticky top-0 z-40 transition-colors"
      style={{
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 font-bold"
          style={{ color: isDarkMode ? '#60a5fa' : '#1d4ed8' }}
        >
          <span role="img" aria-label="logo">🌊</span>
          <span>STORM</span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            to="/report"
            className={({ isActive }) => `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
          >
            Report
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) => `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
          >
            Map
          </NavLink>
          
          {/* Debug indicator */}
          <div className="px-2 py-1 text-xs bg-red-500 dark:bg-green-500 text-white rounded">
            {isDarkMode ? 'DARK' : 'LIGHT'}
          </div>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              // Sun icon for light mode
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
