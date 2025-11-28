
import React from 'react';

interface EmptyStateProps {
    onCreateNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew }) => {
    return (
        <div className="flex flex-col px-4 py-16 flex-1 justify-center items-center">
            <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-[320px]">
                    <img src="https://illustrations.popsy.co/emerald/shopping-cart.svg" alt="Ilustração de um carrinho de compras vazio" className="w-full h-auto" />
                </div>
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                    <p className="text-zinc-900 dark:text-zinc-100 text-lg font-bold leading-tight tracking-tight text-center">Você ainda não tem nenhuma lista.</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal max-w-[480px] text-center">Que tal criar a sua primeira?</p>
                </div>
                <button onClick={onCreateNew} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-wide gap-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    <span className="truncate">Criar Nova Lista</span>
                </button>
            </div>
        </div>
    );
};

export default EmptyState;
