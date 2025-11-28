
import React, { useState, useMemo, useCallback } from 'react';
import type { ShoppingList } from '../types';
import { SortOption, SortDirection } from '../types';
import ListCard from './ListCard';
import EmptyState from './EmptyState';

interface ListsDashboardPageProps {
    lists: ShoppingList[];
    onCreateNew: () => void;
    onSelectList: (listId: string) => void;
    onDeleteList: (listId: string) => void;
    onStartShopping: (listId: string) => void;
}

import SortButton from './SortButton';


const ListsDashboardPage: React.FC<ListsDashboardPageProps> = ({ lists, onCreateNew, onSelectList, onDeleteList, onStartShopping }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>(SortOption.CreationDate);
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc);

    const handleSort = (option: SortOption) => {
        if (option === sortOption) {
            setSortDirection(prev => prev === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc);
        } else {
            setSortOption(option);
            setSortDirection(SortDirection.Asc);
        }
    };

    const filteredAndSortedLists = useMemo(() => {
        return lists
            .filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                let comparison = 0;
                switch (sortOption) {
                    case SortOption.Name:
                        comparison = a.name.localeCompare(b.name);
                        break;
                    case SortOption.CreationDate:
                        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        break;
                    case SortOption.LastModified:
                        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                        break;
                }
                return sortDirection === SortDirection.Asc ? comparison : -comparison;
            });
    }, [lists, searchTerm, sortOption, sortDirection]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <header className="flex w-full items-center justify-center border-b border-zinc-200/80 dark:border-zinc-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-8 md:px-10 py-3 max-w-7xl w-full">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                            <div className="size-6 text-primary">
                                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.252 21c-1.378 0-2.613-2.071-3.18-3.14-0.567 2.069-1.802 3.14-3.18 3.14s-2.613-2.071-3.18-3.14c-0.567 2.069-1.802 3.14-3.18 3.14-2.022 0-3.66-4.453-3.66-9.95s1.638-9.95 3.66-9.95c1.378 0 2.613 2.071 3.18 3.14 0.567-2.069 1.802-3.14 3.18-3.14s2.613 2.071 3.18 3.14c0.567-2.069 1.802-3.14 3.18-3.14 2.022 0 3.66 4.453 3.66 9.95s-1.638 9.95-3.66 9.95z"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">Minhas Listas</h2>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 sm:gap-6">
                        <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-zinc-500 dark:text-zinc-400 flex border-none bg-zinc-100 dark:bg-zinc-900 items-center justify-center pl-3 rounded-l-lg border-r-0">
                                    <span className="material-symbols-outlined text-lg">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-0 focus:ring-0 border-none bg-zinc-100 dark:bg-zinc-900 focus:border-none h-full placeholder:text-zinc-500 dark:placeholder:text-zinc-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search lists..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                        </label>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArnVqOciSLE7uGO7tM4XOaGLMylI1pWdbOfSYLSfqyJZoPfTPAYKQM0NBewMZD9a6KRz0ynAATC9qIZadvCdvNhHqaHD3KJKBByj1dcx9Z2_Rjc3Y-3IsK_97CssBFq2GPPRH9Gxf2WCxVW9iqBbeiFRACsWxLea0CkxSTOnS8JjVjv5tG3IYiSwMJ9aKNY6XRbrNuT-HTOUXK84mgq7Dw6WWJ1xc2LLV-fUCZ0V8KreXuZf09IIoSWeLHc_-lvNLlghgTg6xuW-n1")' }}></div>
                    </div>
                </div>
            </header>
            <main className="px-4 sm:px-8 md:px-10 flex flex-1 justify-center py-5 sm:py-8">
                <div className="layout-content-container flex flex-col max-w-7xl flex-1 gap-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h1 className="text-zinc-900 dark:text-zinc-100 text-3xl sm:text-4xl font-black tracking-tighter">Suas Listas</h1>
                        <button onClick={onCreateNew} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-wide gap-2">
                            <span className="material-symbols-outlined text-lg">add</span>
                            <span className="truncate">Criar Nova Lista</span>
                        </button>
                    </div>
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-8 md:-mx-10 px-4 sm:px-8 md:px-10">
                        <SortButton label="Sort by Name" icon="sort_by_alpha" onClick={() => handleSort(SortOption.Name)} isActive={sortOption === SortOption.Name} direction={sortDirection} />
                        <SortButton label="Sort by Creation Date" icon="calendar_today" onClick={() => handleSort(SortOption.CreationDate)} isActive={sortOption === SortOption.CreationDate} direction={sortDirection} />
                        <SortButton label="Sort by Last Modified" icon="edit_calendar" onClick={() => handleSort(SortOption.LastModified)} isActive={sortOption === SortOption.LastModified} direction={sortDirection} />
                    </div>
                    {filteredAndSortedLists.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                            {filteredAndSortedLists.map(list => (
                                <ListCard key={list.id} list={list} onSelect={onSelectList} onDelete={onDeleteList} onShop={onStartShopping} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState onCreateNew={onCreateNew} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default ListsDashboardPage;
