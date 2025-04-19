import { useState } from 'react';
import SpecialtySelector from '../../Components/ClerkingForm/SpecialtySelector';
import DynamicFormRenderer from '../../Components/ClerkingForm/DynamicFormRenderer';
import InternalMedicineForm from '../../FormFields/InternalMedicineForm';
import SurgeryForm from '../../FormFields/SurgeryForm';
import NavbarLoggedIn from '../../Components/Navbar/NavbarLoggedIn';
import api from '../../api/axios';

const specialties = [
    {
        id: 'internal medicine',
        name: 'Internal Medicine', 
        description: 'clerking pad for internal medicine'
    },
    {
        id: 'surgery',
        name: 'Surgery',
        description: 'clerking pad for surgery'
    }
]

const NewClerkingSession = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [formFields, setFormFields] = useState([]);

    // Handle specialty selection and form fields
    const handleSpecialtySelect = (specialtyId) => {
        setSelectedSpecialty(specialtyId);
        setFormFields(getFormFields(specialtyId));
    };

    // Handle form submission
    const handleFormSubmit = async (data) => {
        try {
            // Validate input data
            if (!data || Object.keys(data).length === 0) {
                throw new Error('Form data is empty or invalid');
            }

            // Make API request
            const response = await api.post('/clerking-sessions', data);

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

    // Get form fields based on specialty
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
            <div className="min-h-screen bg-gray-50 pt-16"> {/* Added pt-16 for padding top */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8 text-center">
                        New Patient
                    </h1>
                    
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