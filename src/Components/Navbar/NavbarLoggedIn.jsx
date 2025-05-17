import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

/**
 * NavbarLoggedIn Component
 * 
 * A navigation bar component displayed when a user is logged in.
 * Features a logo, primary navigation links, and a user menu dropdown.
 * 
 * The navbar includes:
 * - Logo/brand name that links to home
 * - Primary navigation links (Dashboard, New Clerking, History)
 * - User profile menu with dropdown functionality
 * - Responsive design with mobile menu
 */
const NavbarLoggedIn = () => {
    const { logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="w-full flex justify-center bg-transparent pt-6 mb-10">
            <div className="fixed z-50 w-full max-w-7xl mx-2 bg-white border border-gray-200 rounded-xl shadow-md px-4 sm:px-8 py-4">
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
                            to="/clerkings"
                            className="text-blue-900 font-semibold hover:text-blue-600 transition-colors"
                        >
                            Clerking List
                        </Link>
                        <Link
                            to="/clerkings/new"
                            className="text-blue-900 font-semibold hover:text-blue-600 transition-colors"
                        >
                            New Clerking
                        </Link>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                // onBlur={() => setIsUserMenuOpen(false)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full bg-blue-800 text-white flex items-center justify-center">
                                    {user?.last_name?.charAt(0)}
                                </div>
                            </button>

                            {isUserMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100">
                                    <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.first_name} {user?.last_name}</p>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <span className="flex-1">Your Profile</span>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <span className="flex-1">Settings</span>
                                        </Link>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                logout();
                                            }}
                                            className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 rounded-b-lg"
                                        >
                                            <span className="flex-1">Sign out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="py-2 pl-9.5 space-y-1 ">
                        <Link
                            to="/clerkings"
                            className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
                            onClick={() => toggleMobileMenu()}
                            onBlur={() => toggleMobileMenu()}
                        >
                            Clerking List
                        </Link>
                        <Link
                            to="/clerkings/new"
                            className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
                            onClick={() => toggleMobileMenu()}
                        >
                            New Clerking
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavbarLoggedIn;