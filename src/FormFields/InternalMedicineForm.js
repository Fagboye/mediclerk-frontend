const InternalMedicineFields = [
    {
        id: 'patient_biodata',
        name: 'patient_biodata',
        label: 'Patient Biodata',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter patient biodata',
        validation: {
            required: 'Patient biodata is required'
        },
        showAiSuggestions: false
    },
    {
        id: 'presenting_complaints',
        name: 'presenting_complaints',
        label: 'Presenting Complaints',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter presenting complaint',
        validation: {
            required: 'Presenting complaints is required'
        },
        showAiSuggestions: false
    },
    {
        id: 'history_of_presenting_complaints',
        name: 'history_of_presenting_complaints',
        label: 'History of Presenting Complaints',
        type: 'textarea', 
        rows: 4,
        placeholder: 'Enter history of presenting complaint',
        validation: {
            required: 'History of presenting complaints is required'
        }
    },
    {
        id: 'past_medical_history',
        name: 'past_medical_history',
        label: 'Past Medical History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter past medical history',
        validation: {
            required: 'Past medical history is required'
        }
    },
    {
        id: 'drug_history',
        name: 'drug_history',
        label: 'Drug History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter drug history',
        validation: {
            required: 'Drug history is required'
        }
    },
    {
        id: 'family_history',
        name: 'family_history',
        label: 'Family History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter family history',
        validation: {
            required: 'Family history is required'
        }
    },
    {
        id: 'social_history',
        name: 'social_history',
        label: 'Social History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter social history', 
        validation: {
            required: 'Social history is required'
        }
    },
    {
        id: 'examinations',
        name: 'examinations',
        label: 'Examinations',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter examination findings',
        validation: {
            required: 'Examination findings are required'
        }
    },
    {
        id: 'diagnosis',
        name: 'diagnosis',
        label: 'Diagnosis',
        type: 'text',
        placeholder: 'Enter diagnosis',
        validation: {
            required: 'Diagnosis is required'
        },
        showAiSuggestions: false
    }
]

export default InternalMedicineFields;