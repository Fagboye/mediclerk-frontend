/**
 * Register Component
 * 
 * Handles user registration functionality with form validation and error handling.
 * Features:
 * - Form validation using Zod schema
 * - Field-specific error messages
 * - Loading states during submission
 * - Responsive design
 */

import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Form state initialization
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  // Zod schema for form validation
  const registerSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"), 
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
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
   * Validates input, attempts registration, and handles any errors
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data using Zod schema
      const validatedData = registerSchema.parse(formData);
      
      // Attempt registration
      const response = await api.post('/auth/register', validatedData);
      if (response.status === 201) {
        console.log(response.data);
        navigate('/login');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle API/network errors
        console.error('Registration failed:', error);
        setErrors({ submit: error.response?.data?.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Configuration for form fields
  const formFields = [
    { label: 'First Name', type: 'text', name: 'first_name', autoComplete: 'given-name' },
    { label: 'Last Name', type: 'text', name: 'last_name', autoComplete: 'family-name' },
    { label: 'Email', type: 'text', name: 'email', autoComplete: 'email' },
    { label: 'Password', type: 'password', name: 'password', autoComplete: 'new-password' }
  ];
  
  return (
    <div>
      <Navbar />

      {/* Main registration container */}
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {/* Logo and title section */}
          <div className="flex flex-col items-center mb-6">
            <img src="/stethoscope.svg" alt="MediClerk Logo" className="w-8 h-8 mb-2" />
            <h2 className="text-2xl font-bold text-center text-blue-800">Sign Up</h2>
          </div>

          {/* Display submission errors if any */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map(field => (
              <div key={field.name}>
                <label className={labelClasses} htmlFor={field.name}>{field.label}</label>
                <input 
                  id={field.name}
                  type={field.type}
                  onChange={handleChange}
                  name={field.name}
                  className={inputClasses}
                  autoComplete={field.autoComplete}
                  required
                />
                {/* Display field-specific validation errors */}
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
                {/* Password requirement hint */}
                {field.name === 'password' && !errors.password && (
                  <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                )}
              </div>
            ))}

            {/* Submit button with loading state */}
            <button 
              type="submit" 
              disabled={loading}
              className={`${buttonClasses} ${
                loading 
                  ? 'bg-blue-800 cursor-not-allowed' 
                  : 'bg-blue-800 hover:bg-blue-900'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <a href="/login" className="text-blue-800 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;