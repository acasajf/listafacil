import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getValue<T,>(key: string, initialValue: T | (() => T)): T {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
        try {
            return JSON.parse(savedValue);
        } catch {
             // If parsing fails, it might be a raw string
             return savedValue as unknown as T;
        }
    }
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

// FIX: Corrected the type signature to use imported Dispatch and SetStateAction directly, resolving the 'Cannot find namespace React' error.
export function useLocalStorage<T,>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => getValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}