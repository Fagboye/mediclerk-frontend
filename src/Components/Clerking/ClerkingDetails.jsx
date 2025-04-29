/**
 * @file ClerkingDetails.jsx
 * @description Component for displaying detailed information about a clerking session
 * @module Components/Clerking/ClerkingDetails
 */

import React, { useState, useEffect } from 'react';

/**
 * ClerkingDetails component displays patient details, medical history, examinations and diagnosis
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.clerking - The clerking session data
 * @param {string} props.clerking.specialty - Medical specialty
 * @param {Object} props.clerking.clerking_note - Patient and medical details
 * @returns {JSX.Element} Rendered component
 */
const ClerkingDetails = ({clerking}) => {
    // State for managing loading status
    const [isLoading, setIsLoading] = useState(true);

    // Style constants for consistent UI presentation
    const sectionStyles = "mb-6 border-b pb-4";
    const lastSectionStyles = "mb-6 pb-4";
    const headingStyles = "text-xl font-semibold text-gray-700 mb-2";
    const subHeadingStyles = "text-lg font-medium text-gray-600 mb-1";
    const textStyles = "text-gray-600";


    /**
     * Renders error message if clerking note is missing
     */
    if (!clerking.clerking_note) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <p className="text-red-600">Clerking note data is missing</p>
            </div>
        );
    }

    /**
     * Main render method for displaying clerking details
     */
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" id="content">
            {/* Specialty section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Specialty</h2>
                <p className={textStyles}>{clerking.specialty?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') || 'Not Specified'}</p>
            </div>

            {/* Patient details section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Patient Details</h2>
                <h3 className={subHeadingStyles}>Name: {clerking.clerking_note.first_name || 'N/A'} {clerking.clerking_note.last_name || 'N/A'}</h3>
                <h3 className={subHeadingStyles}>Biodata</h3>
                <p className={textStyles}>{clerking.clerking_note.patient_biodata || 'No biodata available'}</p>
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

            {/* Pediatrics specialty sections */}
            {clerking.specialty === 'pediatrics' && (
                <>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Antenatal History</h2>
                        <p className={textStyles}>{clerking.clerking_note.antenatal_history || 'No antenatal history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Natal History</h2>
                        <p className={textStyles}>{clerking.clerking_note.natal_history || 'No natal history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Postnatal History</h2>
                        <p className={textStyles}>{clerking.clerking_note.postnatal_history || 'No postnatal history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Nutritional History</h2>
                        <p className={textStyles}>{clerking.clerking_note.nutritional_history || 'No nutritional history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Immunization History</h2>
                        <p className={textStyles}>{clerking.clerking_note.immunization_history || 'No immunization history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Growth and Developmental History</h2>
                        <p className={textStyles}>{clerking.clerking_note.growth_and_developmental_history || 'No growth and developmental history'}</p>
                    </div>
                </>
            )}

            {/* Obstetrics and Gynaecology specialty sections */}
            {clerking.specialty === 'obstetrics and gynaecology' && (
                <>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Past Gynaecological History</h2>
                        <p className={textStyles}>{clerking.clerking_note.past_gynaecological_history || 'No past gynaecological history'}</p>
                    </div>
                    <div className={sectionStyles}>
                        <h2 className={headingStyles}>Past Obstetrical History</h2>
                        <p className={textStyles}>{clerking.clerking_note.past_obstetrical_history || 'No past obstetrical history'}</p>
                    </div>
                </>
            )}

            {/* Surgery specialty section */}
            {clerking.specialty === 'surgery' && (
                <div className={sectionStyles}>
                    <h2 className={headingStyles}>Past Surgical History</h2>
                    <p className={textStyles}>{clerking.clerking_note.past_surgical_history || 'No past surgical history'}</p>
                </div>
            )}

            {/* Common medical history section (except surgery) */}
            {clerking.specialty !== 'surgery' && (
                <div className={sectionStyles}>
                    <h2 className={headingStyles}>Past Medical History</h2>
                    <p className={textStyles}>{clerking.clerking_note.past_medical_history || 'No past medical history'}</p>
                </div>
            )}

            {/* Common sections for all specialties */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Drug History</h2>
                <p className={textStyles}>{clerking.clerking_note.drug_history || 'No drug history'}</p>
            </div>

            <div className={sectionStyles}>
                <h2 className={headingStyles}>Family and Social History</h2>
                <p className={textStyles}>{clerking.clerking_note.family_and_social_history || 'No family and social history'}</p>
            </div>

            <div className={sectionStyles}>
                <h2 className={headingStyles}>Examinations</h2>
                <p className={textStyles}>{clerking.clerking_note.examinations || 'No examinations'}</p>
            </div>

            <div className={lastSectionStyles}>
                <h2 className={headingStyles}>Diagnosis</h2>
                <p className={textStyles}>{clerking.clerking_note.diagnosis || 'No diagnosis'}</p>
            </div>
        </div>
    )
}

export default ClerkingDetails;
