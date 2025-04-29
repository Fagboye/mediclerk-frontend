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
 * - Responsive design - navigation links hide on mobile
 */
const NavbarLoggedIn = () => {


    const { logout } = useAuth();


    // State to control user menu dropdown visibility
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Hook for programmatic navigation
    const navigate= useNavigate();

    // User data from authentication context

    const { user } = useAuth();

    /**
     * Toggles the visibility of the user menu dropdown
     * Controls showing/hiding of the profile menu when user clicks avatar
     */
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        // Fixed header that stays at top of viewport
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white z-10">
            {/* Left section containing logo and primary navigation */}
            <div className="flex items-center">
                {/* Application logo/brand name - links to home page */}
                <Link to="/" className="text-2xl font-bold text-blue-800">
                    MediClerk
                </Link>

                {/* Main navigation links - hidden on mobile, visible on sm breakpoint and up */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Dashboard link with hover effects */}
                    <Link
                        to="/clerkings"
                        className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        Clerking List
                    </Link>
                    {/* New Clerking link with hover effects */}
                    <Link
                        to="/clerkings/new"
                        className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        New Clerking
                    </Link>
                </div>
            </div>

            {/* Right section containing user profile menu */}
            <div className="flex items-center">
                <div className="relative">
                    {/* User menu trigger button - toggles dropdown visibility */}
                    <button
                        onClick={toggleUserMenu}
                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span className="sr-only">Open user menu</span>
                        {/* User avatar circle with first letter of name */}
                        <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            {user?.last_name?.charAt(0)}
                        </div>
                    </button>

                    {/* Dropdown menu - conditionally rendered based on isUserMenuOpen state */}
                    {isUserMenuOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100">
                            {/* User info section displaying name and email */}
                            <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.first_name} {user?.last_name}</p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                            </div>
                            {/* Profile link with hover effect */}
                            <div className="py-1">
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <span className="flex-1">Your Profile</span>
                                </Link>
                                {/* Settings link with hover effect */}
                                <Link
                                    to="/settings"
                                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <span className="flex-1">Settings</span>
                                </Link>
                            </div>
                            {/* Sign out button - navigates to login page */}
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
        </header>
    );
};

export default NavbarLoggedIn;