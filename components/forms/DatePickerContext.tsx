"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface DatePickerContextType {
    openPickerId: string | null;
    setOpenPickerId: (id: string | null) => void;
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(
    undefined
);

export function DatePickerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openPickerId, setOpenPickerId] = useState<string | null>(null);

    return (
        <DatePickerContext.Provider value={{ openPickerId, setOpenPickerId }}>
            {children}
        </DatePickerContext.Provider>
    );
}

export function useDatePickerContext() {
    const context = useContext(DatePickerContext);
    if (!context) {
        return { openPickerId: null, setOpenPickerId: () => {} };
    }
    return context;
}
