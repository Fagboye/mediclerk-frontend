import Navbar from '../../Components/Navbar'

const Login = () => {
  return (
    <div>
      <Navbar />
    
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login to Mediclerk</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login