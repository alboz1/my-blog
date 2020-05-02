import React, { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../globals/theme';

const initalValue = {
    themeMode: {
        light: false,
        dark: false
    },
    toggleTheme: () => {}
};

export const ToggleThemeContext = createContext(initalValue);

export const ToggleThemeProvider = ({ children }) => {
    const [themeMode, setTheme] = useState({
        light: false,
        dark: false
    });

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';

        setTheme({
            light: currentTheme === 'light',
            dark: currentTheme === 'dark'
        });
    }, [])

    const toggleTheme = () => {
        typeof window !== 'undefined' && localStorage.setItem('theme', themeMode.light ? 'dark' : 'light');
        setTheme({
            light: !themeMode.light,
            dark: !themeMode.dark
        });
        
    }

    return (
        <ToggleThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={themeMode.light ? theme.light : theme.dark}>
                { children }
            </ThemeProvider>
        </ToggleThemeContext.Provider>
    );
}