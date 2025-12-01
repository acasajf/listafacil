
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [authMode, setAuthMode] = useState<'Entrar' | 'Criar Conta'>('Entrar');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (authMode === 'Entrar') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onLogin();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Verifique seu e-mail para confirmar o cadastro!');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full min-h-screen">
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-background-light dark:bg-background-dark p-12">
                <div className="flex flex-col items-start gap-8 max-w-md w-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">shopping_basket</span>
                        </div>
                        <span className="text-xl font-bold text-text-light dark:text-text-dark">ListaFácil</span>
                    </div>
                    <h1 className="text-text-light dark:text-text-dark tracking-tighter text-5xl font-bold leading-tight">Suas compras, mais simples do que nunca.</h1>
                    <div className="w-full aspect-square bg-contain bg-no-repeat bg-center rounded-xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJZytKJitUJoDAMo2sWedP_EFi1kRrFuYYYrUNy-0n-VzRhrnA0-bM5zThjKNFRk5bVp0LF7nojb3PasUF7J6u4D_-FNxr2wMHBX9p1dDJUtyyojgcl-4mMFfLm3CePxAGCzHl8owRu1q4si-7hl26OaVqXUPkzB-l1IzT5e_pp3vQW56KXonA1V0jX75eD37pDkBNWg4oMITCQ2qiWbpaFodVWSncI-jNZZzTX2GGOKVnB3-np3l4ZlSK1tVxTneK1HASsAM94_ox')" }}></div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-foreground-light dark:bg-foreground-dark p-6 sm:p-12">
                <div className="flex flex-col w-full max-w-md gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-text-light dark:text-text-dark tracking-tight text-4xl font-bold leading-tight">Bem-vindo(a) de volta!</p>
                        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">Acesse sua conta para continuar.</p>
                    </div>
                    <div className="flex">
                        <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark p-1">
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-foreground-light dark:has-[:checked]:bg-foreground-dark has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-text-light dark:has-[:checked]:text-text-dark text-subtle-light dark:text-subtle-dark text-sm font-medium leading-normal">
                                <span className="truncate">Entrar</span>
                                <input checked={authMode === 'Entrar'} onChange={() => setAuthMode('Entrar')} className="invisible w-0" name="auth-toggle" type="radio" value="Entrar" />
                            </label>
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-foreground-light dark:has-[:checked]:bg-foreground-dark has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-text-light dark:has-[:checked]:text-text-dark text-subtle-light dark:text-subtle-dark text-sm font-medium leading-normal">
                                <span className="truncate">Criar Conta</span>
                                <input checked={authMode === 'Criar Conta'} onChange={() => setAuthMode('Criar Conta')} className="invisible w-0" name="auth-toggle" type="radio" value="Criar Conta" />
                            </label>
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <label className="flex flex-col w-full">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">E-mail</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal"
                                placeholder="seuemail@exemplo.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Senha</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal"
                                placeholder="Sua senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <a className="text-sm font-medium text-primary hover:underline text-right" href="#">Esqueci minha senha</a>
                        <button
                            className="flex items-center justify-center h-12 px-6 py-3 bg-primary text-black dark:text-black text-base font-bold rounded-lg w-full transition-colors hover:bg-primary/90 disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : authMode}
                        </button>
                    </form>
                    <div className="flex items-center gap-4">
                        <hr className="flex-grow border-border-light dark:border-border-dark" />
                        <span className="text-subtle-light dark:text-subtle-dark text-sm">OU</span>
                        <hr className="flex-grow border-border-light dark:border-border-dark" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <button type="button" className="flex items-center justify-center gap-2 h-12 px-6 py-3 border border-border-light dark:border-border-dark bg-transparent text-text-light dark:text-text-dark text-base font-medium rounded-lg w-full transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                            <svg aria-hidden="true" className="w-5 h-5" role="img" viewBox="0 0 48 48">
                                <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.35 6.52C12.91 13.46 18.06 9.5 24 9.5z" fill="#4285F4"></path>
                                <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02C43.51 39.99 46.98 32.95 46.98 24.55z" fill="#34A853"></path>
                                <path d="M10.91 28.74c-.52-1.57-.82-3.24-.82-5.01s.3-3.44.82-5.01L2.56 13.22C1.04 16.25 0 19.99 0 24s1.04 7.75 2.56 10.78l8.35-6.52z" fill="#FBBC05"></path>
                                <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-5.95 0-11.09-3.96-12.91-9.28L2.56 34.78C6.51 42.62 14.62 48 24 48z" fill="#EA4335"></path>
                                <path d="M0 0h48v48H0z" fill="none"></path>
                            </svg>
                            Continuar com Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 h-12 px-6 py-3 border border-border-light dark:border-border-dark bg-transparent text-text-light dark:text-text-dark text-base font-medium rounded-lg w-full transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                            <svg aria-hidden="true" className="w-5 h-5" role="img" viewBox="0 0 24 24">
                                <path d="M17.22,3.35a5.53,5.53,0,0,0-4.48,2.23,5.43,5.43,0,0,0-4.43-2.23C5.52,3.35,3,5.88,3,8.69A5.13,5.13,0,0,0,4,11.2,5.2,5.2,0,0,0,3,13.67c0,3,2.71,5,5.66,5A5.3,5.3,0,0,0,13,17.41a5.72,5.72,0,0,0,4.34,1.26c.21,0,.42,0,.62,0,2.62-.2,4-2,4.06-2a10.45,10.45,0,0,1-2.34-3.55,5.1,5.1,0,0,0,1.26-3.32C21,5.82,18.73,3.35,17.22,3.35Zm-1.2,12.37a3.17,3.17,0,0,1-3.21-3.18,3.13,3.13,0,0,1,3.19-3.15,3.08,3.08,0,0,1,3.18,3.15A3.13,3.13,0,0,1,16,15.72Zm-1.89-9.15a3,3,0,0,1,2.58-1.55,3.13,3.13,0,0,1,2.6,1.55,3.42,3.42,0,0,0-2.6-1.28A3.42,3.42,0,0,0,14.12,6.57Z" fill="currentColor"></path>
                            </svg>
                            Continuar com Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
