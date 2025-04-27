// import required dependencies
import { useState } from 'react';
import SpecialtySelector from '../../Components/ClerkingForm/SpecialtySelector';
import DynamicFormRenderer from '../../Components/ClerkingForm/DynamicFormRenderer';
import InternalMedicineForm from '../../FormFields/InternalMedicineForm';
import SurgeryForm from '../../FormFields/SurgeryForm';
import NavbarLoggedIn from '../../Components/Navbar/NavbarLoggedIn';
import api from '../../api/axios';
import { specialties } from '../../FormFields/Specialties';

const NewClerkingSession = () => {
    // State management for specialty selection and form fields
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [formFields, setFormFields] = useState([]);

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
            // Validate input data
            if (!data || Object.keys(data).length === 0) {
                throw new Error('Form data is empty or invalid');
            }

            // Prepare payload for API request
            const payload = {
                specialty: selectedSpecialty,
                form_data: data
            }

            // Make API request to create new clerking note
            const response = await api.post('/clerk-note', payload);

            // Validate API response
            if (!response || !response.data) {
                throw new Error('Invalid response from server');
            }

            if (response.status === 201) {
                console.log('Clerking session created successfully');
                navigate('/clerking-sessions');
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            // Comprehensive error handling for different scenarios
            if (error.response) {
                // Server responded with error status
                console.error('Server error:', error.response.data);
                throw new Error(error.response.data.message || 'Server error occurred');
            } else if (error.request) {
                // Request made but no response received
                console.error('Network error:', error.request);
                throw new Error('Network error - please check your connection');
            } else {
                // Other errors
                console.error('Error creating clerking session:', error.message);
                throw new Error('Failed to create clerking session');
            }
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
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8 text-center">
                        New Patient
                    </h1>
                    
                    {/* Specialty selection section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-10 transition-all duration-300 hover:shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 relative before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-20 before:h-1 before:bg-blue-500">
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
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewClerkingSession;