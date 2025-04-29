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

    // State to control menu visibility
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // User data from authentication context
    const { user } = useAuth();

    /**
     * Toggles the visibility of the user menu dropdown
     */
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    /**
     * Toggles the mobile menu
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
            <div className="px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo section */}
                    <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-800">
                        MediClerk
                    </Link>

                    {/* Desktop Navigation - hidden on mobile */}
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link
                            to="/clerkings"
                            className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        >
                            Clerking List
                        </Link>
                        <Link
                            to="/clerkings/new"
                            className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        >
                            New Clerking
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close icon */}
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
                    </div>

                    {/* User menu */}
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
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
                                        >
                                            <span className="flex-1">Your Profile</span>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <span className="flex-1">Settings</span>
                                        </Link>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
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
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-200`}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        to="/clerkings"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Clerking List
                    </Link>
                    <Link
                        to="/clerkings/new"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        New Clerking
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default NavbarLoggedIn;