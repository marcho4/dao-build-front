import React, { useEffect } from 'react';
import Link from 'next/link';
import {useAuth} from "@/contexts/authContext";

const SidebarMenu = ({ isMenuOpen, toggleMenu }) => {
    const { setUser }= useAuth();
    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isMenuOpen]);

    return (
        <>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-1/3 lg:w-64 z-50 bg-white dark:bg-black shadow-lg transform ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out flex flex-col justify-between`}
            >
                <div>
                    <button
                        className="p-4 w-full flex flex-col space-y-1 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-1 bg-black dark:bg-white"></span>
                        <span className="w-6 h-1 bg-black dark:bg-white"></span>
                        <span className="w-6 h-1 bg-black dark:bg-white"></span>
                    </button>

                    <nav className="pt-6">
                        <Link
                            href="/login"
                            onClick={toggleMenu}
                            className="block font-bold ml-10 mb-10 w-full hover:underline"
                        >
                            LOGIN
                        </Link>
                        <Link
                            href="/dashboard"
                            onClick={toggleMenu}
                            className="block font-bold mb-10 ml-10 w-full hover:underline"
                        >
                            DASHBOARD
                        </Link>
                    </nav>
                </div>

                <div className="flex m-0">
                    <button
                        onClick={() => {
                            setUser();
                            toggleMenu();
                        }}
                        className="w-full font-bold hover:underline text-right"
                    >
                        LOG OUT
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;