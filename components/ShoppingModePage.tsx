import React, { useState, useMemo, useCallback } from 'react';
import type { ShoppingList, ListItem } from '../types';

interface ShoppingModePageProps {
    list: ShoppingList;
    onListUpdate: (list: ShoppingList) => void;
    onBack: () => void;
}

const ShoppingModePage: React.FC<ShoppingModePageProps> = ({ list, onListUpdate, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [currentList, setCurrentList] = useState(list);

    const handleToggleItem = (itemId: string) => {
        const updatedItems = currentList.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const updatedList = { ...currentList, items: updatedItems };
        setCurrentList(updatedList);
        onListUpdate(updatedList);
    };

    const groupedItems = useMemo(() => {
        const filtered = currentList.items
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(item => !hideCompleted || !item.completed);

        // FIX: Explicitly typed the reduce accumulator to ensure correct type inference for `groupedItems`.
        // This resolves the error where `items.map` was called on an `unknown` type.
        return filtered.reduce<Record<string, ListItem[]>>((acc, item) => {
            const category = item.category || 'Outros';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});
    }, [currentList.items, searchTerm, hideCompleted]);

    const completedCount = currentList.items.filter(i => i.completed).length;
    const totalCount = currentList.items.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    
    return (
        <div className="flex flex-col min-h-screen">
             <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 md:px-10 py-3 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div className="text-primary"><span className="material-symbols-outlined text-4xl">shopping_cart</span></div>
                    <h1 className="text-lg font-bold">Modo Compras</h1>
                </div>
                 <button onClick={onBack} className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:underline">{list.name}</button>
            </header>
            <main className="flex-grow p-4 md:p-6 max-w-4xl mx-auto w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-900 dark:text-white">Progresso da Compra</p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{completedCount} / {totalCount} itens</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }}></div></div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                             <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Encontrar um item" className="form-input w-full h-12 pl-12 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"/>
                             </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 px-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Ocultar Itens Comprados</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={hideCompleted} onChange={e => setHideCompleted(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {Object.entries(groupedItems).map(([category, items]) => (
                            <div key={category}>
                                <h2 className="text-gray-900 dark:text-white text-xl font-bold px-4 pb-3">{category}</h2>
                                <div className="flex flex-col gap-2">
                                    {items.map(item => (
                                        <div key={item.id} className={`flex items-center gap-4 rounded-lg p-4 border ${item.completed ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                                            <input type="checkbox" checked={item.completed} onChange={() => handleToggleItem(item.id)} className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/50 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor={`item-${item.id}`} className="flex-grow cursor-pointer">
                                                <div className={` ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 block">{item.quantity} {item.unit}{item.notes ? ` - ${item.notes}`: ''}</span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="sticky bottom-0 mt-auto bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Itens Marcados</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{completedCount} / {totalCount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Estimado</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">R$ ---,--</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ShoppingModePage;