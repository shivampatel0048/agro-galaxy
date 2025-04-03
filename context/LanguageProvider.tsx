"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
// import { useCookiesNext } from 'cookies-next';

type Language = 'en' | 'hi';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") ?? "en";
        setLanguage(storedLanguage as Language);
    }, []);

    const updateLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const contextValue = useMemo(() => ({ language, setLanguage: updateLanguage }), [language]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}
