import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {

    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };


    // theme usestate


    const [themeColor, setThemeColor] = useState(getTheme);

    useEffect(() => {
        // Set DaisyUI theme
        document.documentElement.setAttribute('data-theme', themeColor);

        // Set Tailwind dark mode
        if (themeColor === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem('theme', themeColor);
    }, [themeColor]);


    const toggleTheme = () => {
        setThemeColor(pr => (pr === 'light' ? 'dark' : 'light'));
    };
    return (
        <ThemeContext.Provider value={{ themeColor, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;