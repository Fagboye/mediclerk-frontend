/**
 * @file UpdateClerkingSession.jsx
 * @description Component for updating existing clerking sessions with form validation and API integration
 */

// React and routing dependencies
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router';

// Component imports
import DynamicFormRenderer from '../../Components/ClerkingForm/DynamicFormRenderer';
import InternalMedicineForm from '../../FormFields/InternalMedicineForm';
import SurgeryForm from '../../FormFields/SurgeryForm';
import PediatricsForm from '../../FormFields/PediatricsForm';
import ObsGynForm from '../../FormFields/ObsGynForm';
import NavbarLoggedIn from '../../Components/Navbar/NavbarLoggedIn';

// API and context imports
import api from '../../api/axios';
import { specialties } from "../../FormFields/Specialties";
import { useAuth } from "../../context/AuthContext";

/**
 * Returns form fields based on the selected specialty
 * @param {string} specialtyId - ID of the selected specialty
 * @returns {Array} Array of form field configurations
 */
const getFormFields = (specialtyId) => {
    switch (specialtyId) {
        case 'internal medicine': return InternalMedicineForm;
        case 'surgery': return SurgeryForm;
        case 'pediatrics': return PediatricsForm;
        case 'obstetrics and gynaecology': return ObsGynForm;
        default: return [];
    }
};

/**
 * Component for updating an existing clerking session
 * Allows users to modify patient data for a specific specialty
 */
const UpdateClerkingSession = () => {
    // Get clerking session ID from URL params and location state
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    // Get access token from context
    const { accessToken } = useAuth();
    
    // State management
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch existing clerking note data when component mounts
    useEffect(() => {
        const fetchClerkingNote = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get clerking data from state or fetch from API
                let clerking;
                if (state?.clerking) {
                    clerking = state.clerking;
                } else {
                    const response = await api.get(`/clerkpad/retrieve/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                    clerking = response.data;
                }

                if (!clerking) {
                    throw new Error('No clerking data available');
                }

                setSelectedSpecialty(clerking.specialty);
                setFormFields(getFormFields(clerking.specialty));
                setDefaultValues(clerking.clerking_note);

            } catch (err) {
                console.error('Error fetching clerking:', err);
                setError(err.message || 'Failed to fetch clerking details');
            } finally {
                setLoading(false);
            }
        };

        fetchClerkingNote();
    }, [id, accessToken, state]);

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
                form_data: data
            }

            // Make API request
            const response = await api.put(`/clerkpad/update/${id}`, payload, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            // Validate response
            if (!response || !response.data) {
                throw new Error('Invalid response from server');
            }

            if (response.status === 200) {
                console.log('Clerking session updated successfully');
                navigate(`/clerkings/${id}`);
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            // Improve error handling to show user feedback
            console.error('Error updating clerking session:', error);
            
            const errorMessage = error.response?.data?.message 
                || error.message 
                || 'Failed to update clerking session';
            
            // Add state for error handling
            setError(errorMessage);
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

    // Show error message if an error occurs
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-lg">Error: {error}</div>
            </div>
        );
    }

    // Main component render
    return (
        <div>
            <NavbarLoggedIn />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
