
import React, { useState, useEffect } from 'react';
import type { ShoppingList, ListItem } from '../types';
import AddItemModal from './AddItemModal';
import ListItemRow from './ListItemRow';

interface ListDetailPageProps {
    list: ShoppingList;
    onSave: (list: ShoppingList) => void;
    onBack: () => void;
}

const ListDetailPage: React.FC<ListDetailPageProps> = ({ list, onSave, onBack }) => {
    const [currentList, setCurrentList] = useState<ShoppingList>(list);
    const [newItemName, setNewItemName] = useState('');
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<ListItem | null>(null);

    useEffect(() => {
        setCurrentList(list);
    }, [list]);

    const handleSave = () => {
        onSave(currentList);
    };

    const handleItemChange = (itemId: string, completed: boolean) => {
        const updatedItems = currentList.items.map(item =>
            item.id === itemId ? { ...item, completed } : item
        );
        setCurrentList({ ...currentList, items: updatedItems });
    };

    const handleAddItem = (item: Omit<ListItem, 'id' | 'completed'>) => {
        if (itemToEdit) {
            const updatedItems = currentList.items.map(i => i.id === itemToEdit.id ? { ...i, ...item } : i);
            setCurrentList({ ...currentList, items: updatedItems });
            setItemToEdit(null);
        } else {
            const newItem: ListItem = { ...item, id: `item-${Date.now()}`, completed: false };
            setCurrentList({ ...currentList, items: [...currentList.items, newItem] });
        }
    };

    const handleQuickAddItem = () => {
        if (newItemName.trim()) {
            const newItem = {
                name: newItemName.trim(),
                quantity: 1,
                unit: 'un',
                category: 'Outros',
                notes: '',
            };
            handleAddItem(newItem);
            setNewItemName('');
        }
    }

    const handleDeleteItem = (itemId: string) => {
        const updatedItems = currentList.items.filter(item => item.id !== itemId);
        setCurrentList({ ...currentList, items: updatedItems });
    };

    const handleEditItem = (item: ListItem) => {
        setItemToEdit(item);
        setIsAddItemModalOpen(true);
    }

    const openModalForNewItem = () => {
        setItemToEdit(null);
        setIsAddItemModalOpen(true);
    };

    return (
        <>
            <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-black/10 dark:border-b-white/10 px-6 md:px-10 py-3 bg-white dark:bg-background-dark sticky top-0 z-20">
                    <div className="flex items-center gap-4 text-slate-800 dark:text-white">
                        <span className="material-symbols-outlined text-primary text-3xl">checklist</span>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Lista de Compras</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                        <button onClick={handleSave} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-slate-900 text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Salvar Alterações</span>
                        </button>
                        <button onClick={onBack} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Voltar</span>
                        </button>
                    </div>
                </header>
                <main className="flex flex-1 flex-col p-4 md:p-8">
                    <div className="flex flex-wrap justify-between gap-3 pb-8">
                        <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">{list.id.startsWith('list-') ? 'Criar Nova Lista' : 'Editar Lista'}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-1 gap-8">
                        <div className="w-full lg:w-1/3">
                            <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">Nome da Lista</p>
                                    <input value={currentList.name} onChange={e => setCurrentList({ ...currentList, name: e.target.value })} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal" placeholder="Ex: Compras da Semana" />
                                </label>
                                <div>
                                    <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-green-800 dark:text-primary">Ativa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3">
                            <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 h-full">
                                <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Itens</h2>
                                <div className="flex gap-2">
                                    <div className="flex w-full flex-1 items-stretch rounded-lg h-12 bg-background-light dark:bg-slate-800">
                                        <button onClick={openModalForNewItem} className="text-slate-500 dark:text-slate-400 flex items-center justify-center pl-4 rounded-l-lg">
                                            <span className="material-symbols-outlined">add</span>
                                        </button>
                                        <input value={newItemName} onChange={e => setNewItemName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQuickAddItem()} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-transparent h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 pl-2 text-base font-normal leading-normal" placeholder="Adicionar novo item (Ex: Arroz, Feijão, etc.)" />
                                    </div>
                                    <button onClick={handleQuickAddItem} className="flex-shrink-0 flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-slate-900 text-sm font-bold">Adicionar</button>
                                </div>
                                <div className="flex flex-col gap-2 pt-4 flex-1">
                                    {currentList.items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center text-center py-12 flex-1">
                                            <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-600">shopping_basket</span>
                                            <p className="mt-4 font-bold text-slate-700 dark:text-slate-300">Sua lista está vazia</p>
                                            <p className="text-slate-500 dark:text-slate-400">Adicione seu primeiro item acima!</p>
                                        </div>
                                    ) : (
                                        currentList.items.map(item => (
                                            <ListItemRow
                                                key={item.id}
                                                item={item}
                                                onToggle={handleItemChange}
                                                onEdit={handleEditItem}
                                                onDelete={handleDeleteItem}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {isAddItemModalOpen && <AddItemModal
                isOpen={isAddItemModalOpen}
                onClose={() => { setIsAddItemModalOpen(false); setItemToEdit(null) }}
                onAddItem={handleAddItem}
                itemToEdit={itemToEdit}
            />}
        </>
    );
};

export default ListDetailPage;
