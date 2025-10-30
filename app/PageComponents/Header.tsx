"use client"
import { useState } from 'react';

//import component
import HeaderIcon from './HeaderIcon';
import HeaderNav from './HeaderNav';
import HeaderProfile from './HeaderProfile';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <HeaderIcon />
                    {/* Desktop Navigation */}
                    <HeaderNav />
                    {/* Header profile */}
                    <HeaderProfile
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <nav className="flex flex-col gap-4">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2">Tasks</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2">Dashboard</a>
                        </nav>
                    </div>
                )}
            </div>
        </header>

    )
}