import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
    toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState("light");

    // Apply theme to document
    const applyTheme = (mode) => {
        if (mode === "dark") {
            document.documentElement.classList.add('dark');
            document.body.style.backgroundColor = '#111827';
            document.body.style.color = '#f3f4f6';
        } else {
            document.documentElement.classList.remove('dark');
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#111827';
        }
    };

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme !== 'light' && savedTheme !== 'dark' ? systemTheme : savedTheme;
        
        setThemeMode(initialTheme);
        applyTheme(initialTheme);
    }, []);

    // Apply theme whenever themeMode changes
    useEffect(() => {
        applyTheme(themeMode);
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    const lightTheme = () => {
        setThemeMode("light");
    };

    const darkTheme = () => {
        setThemeMode("dark");
    };

    const toggleTheme = () => {
        setThemeMode(prevMode => prevMode === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default function useTheme(){
    return useContext(ThemeContext);
}