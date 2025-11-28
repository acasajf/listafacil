
import React from 'react';
import type { ShoppingList } from '../types';

interface ListCardProps {
    list: ShoppingList;
    onSelect: (listId: string) => void;
    onDelete: (listId: string) => void;
    onShop: (listId: string) => void;
    onCompare: (listId: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onSelect, onDelete, onShop, onCompare }) => {
    const completedItems = list.items.filter(item => item.completed).length;
    const totalItems = list.items.length;

    const subtext = totalItems > 0 ? `${completedItems}/${totalItems} itens` : `Criada em: ${new Date(list.createdAt).toLocaleDateString('pt-BR')}`;

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(window.confirm(`Tem certeza que deseja apagar a lista "${list.name}"?`)){
            onDelete(list.id);
        }
    };
    
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(list.id);
    };

    const handleShop = (e: React.MouseEvent) => {
        e.stopPropagation();
        onShop(list.id);
    };

    const handleCompare = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCompare(list.id);
    };

    return (
        <div onClick={() => onSelect(list.id)} className="flex flex-col gap-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 p-4 transition-all hover:shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer group">
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url(${list.imageUrl})` }}></div>
            <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col">
                    <p className="text-zinc-900 dark:text-zinc-100 text-base font-bold leading-normal">{list.name}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal">{subtext}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleCompare} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400" title="Comparar Preços">
                        <span className="material-symbols-outlined text-lg">price_check</span>
                    </button>
                    <button onClick={handleShop} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400" title="Modo Compras">
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    </button>
                    <button onClick={handleEdit} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400" title="Editar">
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500" title="Apagar">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
