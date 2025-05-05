import { Link } from 'react-router'
import { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/stethoscope.svg" alt="MediClerk Logo" className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-bold text-blue-800">MediClerk</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex sm:space-x-8">
            <Link to="/login" className="text-blue-800 hover:underline font-bold">Login</Link>
            <Link to="/register" className="text-blue-800 hover:underline font-bold">Register</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
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
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-base font-medium text-blue-800 hover:bg-gray-50"
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