"use client"

import Link from "next/link";
import { useState } from "react";
import SidebarMenu from "@/app/components/SideBar";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="relative flex items-center justify-center p-4 bg-[#F8F8F8] dark:bg-dark-primary">
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

            <SidebarMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
        </div>
    );
};