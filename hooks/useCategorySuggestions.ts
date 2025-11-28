
import { useState, useCallback } from 'react';
import { suggestCategories } from '../services/geminiService';

export function useCategorySuggestions() {
    const [suggested, setSuggested] = useState<string[]>([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    const fetchSuggestions = useCallback(async (itemName: string) => {
        if (itemName.length < 3) {
            setSuggested([]);
            return;
        }
        setLoadingSuggestions(true);
        try {
            const cats = await suggestCategories(itemName);
            setSuggested(cats);
        } catch (error) {
            console.error("Failed to fetch suggestions", error);
            setSuggested([]);
        } finally {
            setLoadingSuggestions(false);
        }
    }, []);

    return { suggested, loadingSuggestions, fetchSuggestions, setSuggested };
}
