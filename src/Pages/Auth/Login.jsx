// Import necessary dependencies
import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';

/**
 * Login component that handles user authentication
 * Provides form validation, error handling, and navigation after successful login
 */
const Login = () => {
  // Hooks for navigation and authentication
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State management
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Zod schema for form validation
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
  });

  // Common CSS classes for styling consistency
  const inputClasses = "w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const buttonClasses = "w-full py-2 rounded text-white";

  /**
   * Handles input changes in the form
   * Updates form data and clears any existing errors
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); // Clear errors when user types
  };

  /**
   * Handles form submission
   * Validates input, attempts login, and handles any errors
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data using Zod schema
      const validatedData = loginSchema.parse(formData);
      
      // Attempt login and navigate to dashboard on success
      await login(validatedData.email, validatedData.password);
      navigate('/clerkings');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle authentication errors
        console.error('Login failed:', error);
        setErrors({ submit: 'Login failed. Please check your credentials.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Configuration for form fields
  const formFields = [
    { label: 'Email', type: 'text', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' }
  ];

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
    
      {/* Main login container */}
      <div className="min-h-screen flex items-center justify-center pt-15">
        <div className="bg-white p-16 rounded-xl shadow-lg w-full max-w-2xl">
          <div className="flex flex-col items-center mb-8">
            <img src="/stethoscope.svg" alt="MediClerk Logo" className="w-12 h-12 mb-3" />
            <h2 className="text-3xl font-bold text-center text-blue-800">Sign In</h2>
          </div>
          
          {/* Display submission errors if any */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map(field => (
              <div key={field.name}>
                <label className={labelClasses} htmlFor={field.name}>{field.label}</label>
                <input 
                  id={field.name}
                  type={field.type}
                  onChange={handleChange}
                  name={field.name}
                  className={inputClasses}
                  // required
                />
                {/* Display field-specific validation errors */}
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Submit button with loading state */}
            <button 
              type="submit"
              disabled={loading}
              className={`${buttonClasses} ${
                loading 
                  ? 'bg-blue-700 cursor-not-allowed' 
                  : 'bg-blue-800 hover:bg-blue-900'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Registration link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-800 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login