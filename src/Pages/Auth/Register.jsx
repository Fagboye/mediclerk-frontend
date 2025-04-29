import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  // Common input styles
  const inputClasses = "w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const buttonClasses = "w-full py-2 rounded text-white";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); // Clear errors when user types
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = registerSchema.parse(formData);
      
      const response = await api.post('/auth/register', validatedData);
      if (response.status === 201) {
        console.log(response.data);
        navigate('/login');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into field-specific error messages
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Registration failed:', error);
        setErrors({ submit: error.response?.data?.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Form field configurations
  const formFields = [
    { label: 'First Name', type: 'text', name: 'first_name', autoComplete: 'given-name' },
    { label: 'Last Name', type: 'text', name: 'last_name', autoComplete: 'family-name' },
    { label: 'Email', type: 'text', name: 'email', autoComplete: 'email' },
    { label: 'Password', type: 'password', name: 'password', autoComplete: 'new-password' }
  ];
  
  return (
    <div>
      <Navbar />

      {/* Register Form */}
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create an Account</h2>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}
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
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
                {field.name === 'password' && !errors.password && (
                  <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                )}
              </div>
            ))}
            <button 
              type="submit" 
              disabled={loading}
              className={`${buttonClasses} ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;