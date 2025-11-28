
import { GoogleGenAI, Type } from '@google/genai';

const CATEGORIES = [
  'Frutas e Legumes', 'Carnes e Peixes', 'Padaria', 'Laticínios e Frios',
  'Bebidas', 'Mercearia', 'Congelados', 'Higiene Pessoal', 'Limpeza', 'Outros'
];

export const suggestCategories = async (itemName: string): Promise<string[]> => {
  if (!import.meta.env.VITE_API_KEY) {
    console.warn("API key not found. Returning default categories.");
    // Return some default suggestions if API key is missing
    return ['Mercearia', 'Laticínios e Frios', 'Padaria'];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `For the grocery item "${itemName}" (in Brazilian Portuguese), suggest up to 3 relevant categories from the following list: ${CATEGORIES.join(', ')}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            categories: {
              type: Type.ARRAY,
              description: 'A list of up to 3 suggested categories for the item.',
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ['categories'],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result.categories && Array.isArray(result.categories)) {
      return result.categories.filter(cat => CATEGORIES.includes(cat));
    }
    return [];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return []; // Return an empty array on error
  }
};
