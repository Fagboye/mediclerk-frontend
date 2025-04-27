/**
 * ClerkingDetails Component
 * Displays detailed information about a clerking session including patient details,
 * medical history, examinations and diagnosis
 * 
 * @param {Object} clerking - The clerking session data to display
 * @param {string} clerking.specialty - Medical specialty
 * @param {Object} clerking.clerking_note - Contains patient and medical details
 */
const ClerkingDetails = ({clerking}) => {

    // Common styles for consistent UI presentation
    const sectionStyles = "mb-6 border-b pb-4";
    const lastSectionStyles = "mb-6 pb-4";
    const headingStyles = "text-xl font-semibold text-gray-700 mb-2";
    const subHeadingStyles = "text-lg font-medium text-gray-600 mb-1";
    const textStyles = "text-gray-600";

    // Error handling for null/undefined clerking data
    if (!clerking) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">No clerking data available</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error handling for missing clerking note
    if (!clerking.clerking_note) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">Clerking note data is missing</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" id="content">
            {/* Specialty section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Specialty</h2>
                <p className={textStyles}>{clerking.specialty || 'Not specified'}</p>
            </div>

            {/* Patient details section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Patient Details</h2>
                <h3 className={subHeadingStyles}>Name: {clerking.clerking_note.first_name || 'N/A'} {clerking.clerking_note.last_name || 'N/A'}</h3>
                <h3 className={subHeadingStyles}>Biodata</h3>
                <p className={textStyles}>Age: 45 years old, Gender: Male, Occupation: Teacher, Marital Status: Married, Religion: Christian, Ethnicity: Caucasian, Address: 123 Main Street, Contact: (555) 123-4567, Next of Kin: Jane Doe (Wife), Emergency Contact: (555) 987-6543</p>
            </div>

            {/* Presenting complaints section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Presenting Complaints</h2>
                <p className={textStyles}>{clerking.clerking_note.presenting_complaints || 'No complaints'}</p>
            </div>

            {/* History of presenting complaints section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>History of Presenting Complaints</h2>
                <p className={textStyles}>{clerking.clerking_note.history_of_presenting_complaints || 'No history of presenting complaints'}</p>
            </div>

            {/* Past medical history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Past Medical History</h2>
                <p className={textStyles}>{clerking.clerking_note.past_medical_history || 'No past medical history'}</p>
            </div>

            {/* Drug history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Drug History</h2>
                <p className={textStyles}>{clerking.clerking_note.drug_history || 'No drug history'}</p>
            </div>

            {/* Family history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Family History</h2>
                <p className={textStyles}>{clerking.clerking_note.family_history || 'No family history'}</p>
            </div>

            {/* Social history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Social History</h2>
                <p className={textStyles}>{clerking.clerking_note.social_history || 'No social history'}</p>
            </div>

            {/* Examinations section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Examinations</h2>
                <p className={textStyles}>{clerking.clerking_note.examinations || 'No examinations'}</p>
            </div>

            {/* Diagnosis section */}
            <div className={lastSectionStyles}>
                <h2 className={headingStyles}>Diagnosis</h2>
                <p className={textStyles}>{clerking.clerking_note.diagnosis || 'No diagnosis'}</p>
            </div>
        </div>
    )
}

export default ClerkingDetails;
