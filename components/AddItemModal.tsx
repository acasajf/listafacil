
import React, { useState, useEffect, useCallback } from 'react';
import type { ListItem } from '../types';
import { useCategorySuggestions } from '../hooks/useCategorySuggestions';
import Toast from './Toast';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (item: Omit<ListItem, 'id' | 'completed'>) => void;
    itemToEdit: ListItem | null;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem, itemToEdit }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('un');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('Outros');
    const { suggested, loadingSuggestions, fetchSuggestions, setSuggested } = useCategorySuggestions();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setQuantity(itemToEdit.quantity);
            setUnit(itemToEdit.unit);
            setNotes(itemToEdit.notes || '');
            setCategory(itemToEdit.category);
        } else {
            // Reset form for new item
            setName('');
            setQuantity(1);
            setUnit('un');
            setNotes('');
            setCategory('Outros');
            setSuggested([]);
        }
    }, [itemToEdit, isOpen, setSuggested]);

    useEffect(() => {
        if (!itemToEdit && name.trim().length >= 3) { // Only suggest for new items
            const handler = setTimeout(() => {
                fetchSuggestions(name);
            }, 500); // Debounce API call
            return () => clearTimeout(handler);
        }
    }, [name, itemToEdit, fetchSuggestions]);

    // Update category when suggestions arrive if it's still the default
    useEffect(() => {
        if (suggested.length > 0 && category === 'Outros' && !itemToEdit) {
            setCategory(suggested[0]);
        }
    }, [suggested, category, itemToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newItem = { name, quantity, unit, notes, category };
        onAddItem(newItem);
        setToastMessage(`${name} (${quantity} ${unit}) ${itemToEdit ? 'atualizado' : 'adicionado'} à sua lista.`);
        setShowToast(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-background-light dark:bg-background-dark w-full max-w-2xl rounded-xl shadow-lg flex flex-col max-h-[90vh]">
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-6">
                        <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                            <div className="size-6 text-primary">
                                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 15H13V11H17V9H13V5H11V9H7V11H11V15Z"></path></svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">{itemToEdit ? 'Editar Item' : 'Adicionar Item à Lista'}</h2>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </header>
                    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 space-y-6 overflow-y-auto">
                        <div className="space-y-4">
                            <label className="flex flex-col">
                                <p className="text-slate-900 dark:text-slate-100 text-base font-medium leading-normal pb-2">Nome do Item</p>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-input rounded-xl h-14" placeholder="Ex: Leite integral" />
                            </label>
                            <div className="flex flex-col gap-2">
                                <p className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal">Categoria Sugerida</p>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {loadingSuggestions && <p className="text-sm text-slate-500">Sugerindo...</p>}
                                    {suggested.map(cat => (
                                        <button key={cat} onClick={() => setCategory(cat)} className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${category === cat ? 'bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
                                            <p className="text-sm font-medium leading-normal">{cat}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Quantity and Unit inputs */}
                            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-xl px-4 min-h-14 justify-between border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-900 dark:text-slate-100 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-10">
                                        <span className="material-symbols-outlined">pin</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-slate-100">Quantidade</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">-</button>
                                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-10 text-center bg-transparent border-none focus:ring-0" />
                                    <button onClick={() => setQuantity(q => q + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">+</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-xl px-4 min-h-14 justify-between border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-900 dark:text-slate-100 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-10">
                                        <span className="material-symbols-outlined">weight</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-slate-100">Unidade</p>
                                </div>
                                <select value={unit} onChange={e => setUnit(e.target.value)} className="form-select bg-transparent border-none focus:ring-0">
                                    <option>un</option><option>kg</option><option>g</option><option>L</option><option>ml</option><option>caixa</option><option>pacote</option>
                                </select>
                            </div>
                        </div>
                        <label className="flex flex-col">
                            <p className="text-slate-900 dark:text-slate-100 text-base font-medium pb-2">Notas (opcional)</p>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="form-textarea rounded-xl min-h-28" placeholder="Ex: Marca específica ou detalhe"></textarea>
                        </label>
                    </main>
                    <footer className="p-4 sm:p-6">
                        <button onClick={handleSubmit} className="w-full flex cursor-pointer items-center justify-center rounded-xl h-14 bg-primary text-slate-900 font-bold hover:bg-primary/90">
                            {itemToEdit ? 'Salvar Alterações' : 'Adicionar à Lista'}
                        </button>
                    </footer>
                </div>
            </div>
            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
        </>
    );
};

export default AddItemModal;
