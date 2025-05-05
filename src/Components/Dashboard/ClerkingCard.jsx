/**
 * ClerkingCard Component
 * Displays individual clerking session information in a card format
 * Provides navigation to detailed view on click
 * 
 * @param {Object} clerking - The clerking session data to display
 * @param {string} clerking.id - Unique identifier for the clerking session
 * @param {string} clerking.first_name - Patient's first name
 * @param {string} clerking.last_name - Patient's last name
 * @param {string} clerking.specialty - Medical specialty
 * @param {string} clerking.diagnosis - Patient's diagnosis
 * @param {string} clerking.created_at - Timestamp of clerking creation
 */
import { useNavigate } from 'react-router';

const ClerkingCard = ({id, specialty, clerking_note, created_at}) => {
    // Hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Handles click event on the card
     * Navigates to the detailed view of the clerking session
     */
    const handleClick = () => {
        navigate(`/clerkings/${id}`);
    };

    // Error handling for missing required props
    if (!id || !clerking_note) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-600 text-center">Patient data is missing</p>
            </div>
        );
    }

    // Error handling for missing patient data
    if (!clerking_note.first_name || !clerking_note.last_name) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <p className="text-yellow-600 text-center">Incomplete patient information</p>
            </div>
        );
    }

    return (
        <div 
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 border border-gray-100 w-full cursor-pointer"
            onClick={handleClick} // Fixed: Added the click handler
        >
            {/* Header section with name and specialty */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 hover:text-blue-800 transition-colors">
                    {clerking_note.first_name} {clerking_note.last_name}
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-colors">
                    {(specialty || 'UNKNOWN SPECIALTY').toUpperCase()}
                </span>
            </div>
            {/* Details section with diagnosis and creation time */}
            <div className="space-y-3">
                <div className="flex items-baseline">
                    <p className="text-gray-700 font-medium w-24">Diagnosis:</p>
                    <p className="text-gray-600 font-semibold">
                        {clerking_note.diagnosis || 'No diagnosis recorded'}
                    </p>
                </div>
                <div className="flex items-baseline">
                    <p className="text-gray-700 font-medium w-24">Created:</p>
                    <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <svg className="w-4 h-4 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {created_at}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClerkingCard;