"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type TextScale = "small" | "normal" | "large" | "xlarge";

interface AccessibilityContextType {
    scale: TextScale;
    cycleScale: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [scale, setScale] = useState<TextScale>("normal");

    // Load from local storage if available
    useEffect(() => {
        const saved = localStorage.getItem("daril_a11y_scale");
        if (saved && (saved === "small" || saved === "normal" || saved === "large" || saved === "xlarge")) {
            setScale(saved as TextScale);
        }
    }, []);

    const cycleScale = () => {
        setScale((prev) => {
            let next: TextScale = "normal";
            if (prev === "normal") next = "large";
            else if (prev === "large") next = "xlarge";
            else if (prev === "xlarge") next = "small";
            else if (prev === "small") next = "normal";

            localStorage.setItem("daril_a11y_scale", next);
            return next;
        });
    };

    return (
        <AccessibilityContext.Provider value={{ scale, cycleScale }}>
            <div className="transition-all duration-300">
                {children}
            </div>
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error("useAccessibility must be used within an AccessibilityProvider");
    }
    return context;
}
