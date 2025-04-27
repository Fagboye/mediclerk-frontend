// Import required dependencies
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router';
import SpecialtySelector from '../../Components/ClerkingForm/SpecialtySelector';
import DynamicFormRenderer from '../../Components/ClerkingForm/DynamicFormRenderer';
import InternalMedicineForm from '../../FormFields/InternalMedicineForm';
import SurgeryForm from '../../FormFields/SurgeryForm';
import NavbarLoggedIn from '../../Components/Navbar/NavbarLoggedIn';
import api from '../../api/axios';
import { specialties } from "../../FormFields/Specialties";

/**
 * Returns form fields based on the selected specialty
 * @param {string} specialtyId - ID of the selected specialty
 * @returns {Array} Array of form field configurations
 */
const getFormFields = (specialtyId) => {
    switch (specialtyId) {
        case 'internal medicine': return InternalMedicineForm;
        case 'surgery': return SurgeryForm;
        default: return [];
    }
};

/**
 * Component for updating an existing clerking session
 * Allows users to modify patient data for a specific specialty
 */
const UpdateClerkingSession = () => {
    // Get clerking session ID from URL params
    const {id} = useParams();
    const navigate = useNavigate();
    
    // State management
    const [selectedSpecialty, setSelectedSpecialty] = useState("internal medicine");
    const [formFields, setFormFields] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const [loading, setLoading] = useState(true)

    // Fetch existing clerking note data when component mounts
    useEffect( () => {
        const fetchClerkingNote = async () => {
            try {
                // TODO: Uncomment when API is ready
                // const response = await api.get(`/clerk-note/${id}`);
                // if (!response || !response.data) throw new Error('Invalid response from server');
                // const data = response.data;
                // setSelectedSpecialty("internal medicine");
                setFormFields(getFormFields(selectedSpecialty));
                // setDefaultValues(data.clerking_note);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        fetchClerkingNote();
    }, [id, selectedSpecialty]);

    /**
     * Handles form submission and updates clerking note
     * @param {Object} data - Form data to be submitted
     */
    const handleFormSubmit = async (data) => {
        try {
            // Validate input data
            if (!data || Object.keys(data).length === 0) {
                throw new Error('Form data is empty or invalid');
            }

            const payload = {
                specialty: selectedSpecialty,
                form_data: data
            }

            // Make API request
            const response = await api.post('/clerk-note', payload);

            // Validate response
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
            // Handle specific error types
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

    // Show loading spinner while data is being fetched
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-lg text-gray-600">Loading...</span>
            </div>
        );
    }

    // Main component render
    return (
        <div>
            <NavbarLoggedIn />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8 text-center">
                        Update Patient Data
                    </h1>
                    {/* Specialty information card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Specialty</h2>
                        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                            <div className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {specialties.find(s => s.id === selectedSpecialty)?.name || selectedSpecialty}
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {specialties.find(s => s.id === selectedSpecialty)?.description || 'No description available'}
                            </p>
                        </div>
                    </div>
                    {/* Dynamic form section */}
                    {selectedSpecialty && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Update Patient Details
                            </h2>
                            <DynamicFormRenderer
                                specialtyId={selectedSpecialty}
                                formFields={formFields}
                                onSubmit={handleFormSubmit}
                                defaultValues={defaultValues}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UpdateClerkingSession;
