import { Link } from 'react-router';
import { useState } from 'react';

/**
 * Navbar Component
 * 
 * A navigation bar component displayed when a user is not logged in.
 * Features a logo and authentication links.
 * 
 * The navbar includes:
 * - Logo/brand name that links to home
 * - Authentication links (Login, Register)
 * - Responsive design with mobile menu
 */
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="w-full flex justify-center bg-transparent pt-6 mb-3">
            <div className="fixed w-full max-w-7xl mx-2 bg-white border border-gray-200 rounded-xl shadow-md px-4 sm:px-8 py-4 mb-10">
                <div className="flex flex-row justify-between items-center w-full">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 sm:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/stethoscope.svg" alt="MediClerk Logo" className="w-7 h-7" />
                            <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">MediClerk</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden sm:flex space-x-8">
                        <Link
                            to="/login"
                            className="text-blue-900 font-semibold hover:text-blue-600 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-blue-900 font-semibold hover:text-blue-600 transition-colors"
                        >
                            Register
                        </Link>
                    </nav>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="py-2 pl-9.5 space-y-1">
                        <Link
                            to="/login"
                            className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
                            onClick={() => toggleMobileMenu()}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
                            onClick={() => toggleMobileMenu()}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;