"use client"

import Link from "next/link";
import {useState} from "react";
import SidebarMenu from "@/app/components/sideBar";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <div className="relative flex items-center justify-center p-4">
            {!isMenuOpen && (
                <button
                    className="absolute left-0 flex flex-col space-y-1 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <span className="w-6 h-1 bg-black dark:bg-white"></span>
                    <span className="w-6 h-1 bg-black dark:bg-white"></span>
                    <span className="w-6 h-1 bg-black dark:bg-white"></span>
                </button>
            )
            }
            <h2 className="text-center text-4xl font-bold tracking-tight pt-1">
                <Link href="/">
                    DAO.BUILD
                </Link>
            </h2>
            {/*{isMenuOpen && (*/}
            {/*    <div*/}
            {/*        className="fixed inset-0 bg-black/50 z-40"*/}
            {/*        onClick={toggleMenu}*/}
            {/*        aria-hidden="true"*/}
            {/*    />*/}
            {/*)}*/}
            {/*<div*/}
            {/*    className={`fixed top-0 left-0 h-full w-1/3 lg:w-64 z-50 bg-white dark:bg-black shadow-lg transform ${*/}
            {/*        isMenuOpen ? "translate-x-0" : "-translate-x-full"*/}
            {/*    } transition-transform duration-300 ease-in-out`}*/}
            {/*>*/}
            {/*    <button*/}
            {/*        className="flex flex-col space-y-1 focus:outline-none"*/}
            {/*        onClick={toggleMenu}*/}
            {/*    >*/}
            {/*        <span className="w-6 h-1 bg-black dark:bg-white"></span>*/}
            {/*        <span className="w-6 h-1 bg-black dark:bg-white"></span>*/}
            {/*        <span className="w-6 h-1 bg-black dark:bg-white"></span>*/}
            {/*    </button>*/}
            {/*    <Link href="/login" onClick={toggleMenu}*/}
            {/*          className="flex left-4 flex-col space-y-1 font-bold ml-5 lg:ml-10 mb-6 hover:underline">*/}
            {/*        LOGIN*/}
            {/*    </Link>*/}
            {/*    <Link href="/dashboard" onClick={toggleMenu}*/}
            {/*          className="flex left-4 flex-col space-y-1 font-bold ml-5 lg:ml-10 mb-10 hover:underline">*/}
            {/*        DASHBOARD*/}
            {/*    </Link>*/}
            {/*</div>*/}
            <SidebarMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}

            />
        </div>
    );
};