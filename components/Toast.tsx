
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose, duration]);

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm p-4 z-50">
            <div className="flex items-center gap-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl shadow-lg p-4 animate-fade-in-up">
                <div className="shrink-0">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">Item adicionado com sucesso!</p>
                    <p className="text-sm text-slate-300">{message}</p>
                </div>
                <button onClick={onClose} className="shrink-0">
                    <span className="material-symbols-outlined text-slate-400 hover:text-white text-xl">close</span>
                </button>
            </div>
        </div>
    );
};

export default Toast;
