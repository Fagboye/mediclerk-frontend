import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white z-10">
        <Link to="/">
            <h1 className="text-2xl font-bold text-blue-800">MediClerk</h1>
        </Link>
        <nav className="space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline font-bold">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline font-bold">Register</Link>
        </nav>
    </header>
  );
};

export default Navbar;