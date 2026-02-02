"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "jedi" | "sith";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Remove all previous theme classes
        document.documentElement.classList.remove("light", "dark", "jedi", "sith");
        // Add new theme class
        document.documentElement.classList.add(theme);

        // For 'sith' and 'dark', we might want to also ensure 'dark' tailored shadcn variables are active if needed,
        // but our CSS strategies will likely map .sith to dark values override.
        if (theme === 'sith') {
            document.documentElement.classList.add('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
