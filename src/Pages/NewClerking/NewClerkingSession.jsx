// import required dependencies
import { useState } from 'react';
import SpecialtySelector from '../../Components/ClerkingForm/SpecialtySelector';
import DynamicFormRenderer from '../../Components/ClerkingForm/DynamicFormRenderer';
import InternalMedicineForm from '../../FormFields/InternalMedicineForm';
import SurgeryForm from '../../FormFields/SurgeryForm';
import PediatricsForm from '../../FormFields/PediatricsForm';
import ObsGynForm from '../../FormFields/ObsGynForm';
import NavbarLoggedIn from '../../Components/Navbar/NavbarLoggedIn';
import api from '../../api/axios';
import { specialties } from '../../FormFields/Specialties';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';


const NewClerkingSession = () => {

    // Get access token from auth context
    const { accessToken } = useAuth();
    
    // State management for specialty selection and form fields
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    /**
     * Updates the selected specialty and loads corresponding form fields
     * @param {string} specialtyId - The ID of the selected specialty
     */
    const handleSpecialtySelect = (specialtyId) => {
        setSelectedSpecialty(specialtyId);
        setFormFields(getFormFields(specialtyId));
    };

    /**
     * Handles the submission of the clerking form
     * Validates data, makes API request, and handles responses/errors
     * @param {Object} data - The form data to be submitted
     */
    const handleFormSubmit = async (data) => {
        try {
            setIsLoading(true);
            
            // Additional validation
            if (!selectedSpecialty) {
                throw new Error('Please select a specialty');
            }

            // Validate required fields based on specialty
            const requiredFields = formFields
                .filter(field => field.required)
                .map(field => field.name);
                
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            const payload = {
                specialty: selectedSpecialty,
                form_data: data
            }

            // Make API request to create new clerking note
            const response = await api.post('/clerkpad/create', payload, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Validate API response
            if (!response || !response.data) {
                throw new Error('Invalid response from server');
            }

            if (response.status === 201) {
                console.log('Clerking session created successfully');
                navigate(`/clerkings/${response.data.clerk_note.id}`);
            }

        } catch (error) {
            // Improved error handling
            console.error('Error creating clerking session:', error);
            
            // Get error message from response or default to generic error
            const errorMessage = error.response?.data?.message 
                || error.message 
                || 'Failed to create clerking session';
                
            // Update error state to show in UI
            setError(errorMessage);
            
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Returns form fields configuration based on the selected specialty
     * @param {string} specialtyId - The ID of the specialty
     * @returns {Array} Array of form field configurations
     */
    const getFormFields = (specialtyId) => {
        switch (specialtyId) {
            case 'internal medicine':
                return InternalMedicineForm;
            case 'surgery':
                return SurgeryForm;
            case 'pediatrics':
                return PediatricsForm;
            case 'obstetrics and gynaecology':
                return ObsGynForm;
            default:
                return [];
        }
    }

    return (
        <div>
            <NavbarLoggedIn />
            {/* Main container with top padding for navbar */}
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Add error display */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <p>{error}</p>
                        </div>
                    )}
                    {/* Specialty selection section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-10 transition-all duration-300 hover:shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 relative text-center
                            before:content-[''] before:absolute before:-bottom-2 before:left-1/2 
                            before:-translate-x-1/2 before:w-24 before:h-1 before:bg-gradient-to-r 
                            before:from-blue-500 before:to-blue-700 before:rounded-full
                            after:content-[''] after:absolute after:-bottom-2 after:left-1/2 
                            after:-translate-x-1/2 after:w-12 after:h-1 after:bg-gradient-to-r 
                            after:from-blue-400 after:to-blue-600 after:rounded-full after:opacity-50
                            flex items-center justify-center">
                            Select Specialty
                        </h2>
                        <SpecialtySelector
                            specialties={specialties}
                            selectedSpecialty={selectedSpecialty}
                            onSelect={handleSpecialtySelect}
                        />
                    </div>

                    {/* Dynamic form section - only shown when specialty is selected */}
                    {selectedSpecialty && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Enter Patient Details
                            </h2>
                            <DynamicFormRenderer
                                specialtyId={selectedSpecialty}
                                formFields={formFields}
                                onSubmit={handleFormSubmit}
                                isLoading={isLoading}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewClerkingSession;