
import React from 'react';
import { ListItem } from '../types';

interface ListItemRowProps {
    item: ListItem;
    onToggle: (itemId: string, completed: boolean) => void;
    onEdit: (item: ListItem) => void;
    onDelete: (itemId: string) => void;
}

const ListItemRow: React.FC<ListItemRowProps> = ({ item, onToggle, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 group">
            <div className="flex items-center gap-4">
                <input
                    checked={item.completed}
                    onChange={e => onToggle(item.id, e.target.checked)}
                    className="form-checkbox h-5 w-5 rounded-md border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50 bg-transparent dark:bg-transparent"
                    type="checkbox"
                />
                <div className={`flex flex-col ${item.completed ? 'opacity-60' : ''}`}>
                    <p className={`text-slate-800 dark:text-slate-200 font-medium ${item.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.quantity} {item.unit} {item.category !== 'Outros' && `• ${item.category}`}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(item)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400" title="Editar">
                    <span className="material-symbols-outlined text-base">edit</span>
                </button>
                <button onClick={() => onDelete(item.id)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400" title="Excluir">
                    <span className="material-symbols-outlined text-base">delete</span>
                </button>
            </div>
        </div>
    );
};

export default ListItemRow;
