import { createContext, useState, useEffect, useCallback } from "react";

export const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = `${theme}-theme`;
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }, []);

    return (
        <SettingsContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </SettingsContext.Provider>
    );
};