import Navbar from '../../Components/Navbar/Navbar'

const Error = () => {
  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
            <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
            <p className="text-gray-500 mb-6">The page you are looking for doesn't exist or has been moved.</p>
            <a 
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
        </div>
    </div>
  );
};

export default Error;