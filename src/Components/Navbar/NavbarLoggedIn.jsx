import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

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
    // State to control user menu dropdown visibility
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Hook for programmatic navigation
    const navigate= useNavigate();

    // Mock user data - to be replaced with actual user data from authentication context
    const user = {
        name: 'Dr. John Doe',
        email: 'john.doe@example.com',
        avatar: '/avatar-placeholder.png'
    };

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
                        to="/dashboard"
                        className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        Dashboard
                    </Link>
                    {/* New Clerking link with hover effects */}
                    <Link
                        to="/clerk"
                        className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        New Clerking
                    </Link>
                    {/* History link with hover effects */}
                    <Link
                        to="/history"
                        className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        History
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
                            {user.name.charAt(0)}
                        </div>
                    </button>

                    {/* Dropdown menu - conditionally rendered based on isUserMenuOpen state */}
                    {isUserMenuOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                            {/* User info section displaying name and email */}
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            {/* Profile link with hover effect */}
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Your Profile
                            </Link>
                            {/* Settings link with hover effect */}
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </Link>
                            {/* Sign out button - navigates to login page */}
                            <button
                                onClick={() => {navigate('/login')}}
                                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavbarLoggedIn;