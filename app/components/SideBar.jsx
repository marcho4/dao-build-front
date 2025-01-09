import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from "@/contexts/authContext";
import {  X } from 'lucide-react';
import useToast from "@/hooks/useToast";

const SidebarMenu = ({ isMenuOpen, toggleMenu }) => {
    const { setUser, user } = useAuth();

    async function logout() {
        try {
            const response = await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Logout failed');
            }

            setUser();
            toggleMenu();
            window.location.reload();
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    // Управление скроллом при открытом меню
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Затемнение фона при открытом меню */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}

            {/* Основное меню */}
            <div
                className={`fixed top-0 left-0 h-full w-[280px] max-w-[90vw] z-50 
                           bg-[#F8f8f8] dark:bg-dark-primary shadow-lg 
                           transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
                           transition-transform duration-200 ease-in-out 
                           flex flex-col overflow-hidden`}
            >
                {/* Шапка меню с кнопкой закрытия */}
                <div className="p-4 flex justify-between items-center">
                    <span className="font-bold text-lg ml-2">Menu</span>
                    <button
                        onClick={toggleMenu}
                        className="p-2   rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6 dark:text-off-white" />
                    </button>
                </div>

                {/* Навигационные ссылки */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-2 px-4">
                        <Link
                            href="/"
                            onClick={toggleMenu}
                            className="block p-3 rounded-lg font-semibold
                                     hover:bg-accent hover:text-off-white  transition-colors"
                        >
                            Main page
                        </Link>
                        {!user ? (<Link
                            href="/login"
                            onClick={toggleMenu}
                            className="block p-3 rounded-lg font-semibold
                                     hover:bg-accent hover:text-off-white  transition-colors"
                        >
                            Login
                        </Link>) : null}
                        <Link
                            href="/dashboard"
                            onClick={toggleMenu}
                            className="block p-3 rounded-lg font-semibold
                                     hover:bg-accent hover:text-off-white transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </nav>

                {/* Нижняя панель с кнопкой выхода */}
                <div className="p-4">
                    <button
                        onClick={() => {
                            logout();
                        }}
                        className="w-full p-3 text-center font-semibold dark:text-off-white
                                 hover:bg-accent/50 dark:hover:bg-accent/50
                                 rounded-lg transition-colors"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;