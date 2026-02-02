"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import { z } from "zod";
import { Sparkles, Skull, Sun, Moon } from "lucide-react";

export const themeActionSchema = z.object({
    theme: z.enum(["light", "dark", "jedi", "sith"]).describe("The theme to switch to based on user intent."),
    reason: z.string().optional().describe("A short explanation of why the theme is changing (e.g. 'Welcome to the dark side')."),
});

export const ThemeAction = ({
    theme,
    reason,
}: {
    theme: "light" | "dark" | "jedi" | "sith";
    reason?: string;
}) => {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    const getIcon = () => {
        switch (theme) {
            case "jedi": return <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />;
            case "sith": return <Skull className="w-6 h-6 text-red-500 animate-pulse" />;
            case "dark": return <Moon className="w-6 h-6 text-purple-500" />;
            default: return <Sun className="w-6 h-6 text-orange-500" />;
        }
    };

    const getMessage = () => {
        if (reason) return reason;
        switch (theme) {
            case "jedi": return "The Force is strong with this one. Jedi mode activated.";
            case "sith": return "Welcome to the Dark Side. Sith mode activated.";
            case "dark": return "Lights out. Dark mode activated.";
            default: return "Bringing back the light.";
        }
    };

    return (
        <div className="flex items-center gap-3 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-sm">
                {getIcon()}
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">Theme Updated</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{getMessage()}</p>
            </div>
        </div>
    );
};
