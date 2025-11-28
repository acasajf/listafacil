
import React from 'react';
import { SortDirection } from '../types';

interface SortButtonProps {
    label: string;
    icon: string;
    onClick: () => void;
    isActive: boolean;
    direction: SortDirection;
}

const SortButton: React.FC<SortButtonProps> = ({ label, icon, onClick, isActive, direction }) => (
    <button onClick={onClick} className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-3 ${isActive ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200/80 dark:bg-zinc-800/80'}`}>
        <span className="material-symbols-outlined text-sm text-zinc-700 dark:text-zinc-300">{icon}</span>
        <p className="text-zinc-900 dark:text-zinc-100 text-sm font-medium leading-normal">{label}</p>
        {isActive && (
            <span className="material-symbols-outlined text-base text-zinc-700 dark:text-zinc-300 transition-transform duration-300" style={{ transform: direction === SortDirection.Asc ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                expand_more
            </span>
        )}
    </button>
);

export default SortButton;
