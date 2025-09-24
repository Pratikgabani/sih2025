import React from 'react'
import useTheme from '../../contexts/theme';

export default function ThemeBtn() {
    const {themeMode, lightTheme, darkTheme} = useTheme()
    
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }
    
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {themeMode === 'light' ? '☀️' : '🌙'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={onChangeBtn}
                    checked={themeMode === "dark"}
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 hover:peer-checked:from-blue-700 hover:peer-checked:to-blue-800 transform hover:scale-105"></div>
            </label>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
                {themeMode === 'light' ? 'Light' : 'Dark'}
            </span>
        </div>
    );
}