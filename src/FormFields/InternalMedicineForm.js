const InternalMedicineFields = [
    {
        id: 'first_name',
        name: 'first_name',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter patient first name',
        validation: {
            required: 'Patient first name is required'
        },
        showAiSuggestions: false    
    },
    {
        id: 'last_name',
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter patient last name',
        validation: {
            required: 'Patient last name is required'
        },
        showAiSuggestions: false
    },
    {
        id: 'patient_biodata',
        name: 'patient_biodata',
        label: 'Patient Biodata',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter remaining patient biodata',
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
        validation: {}
    },
    {
        id: 'past_medical_history',
        name: 'past_medical_history',
        label: 'Past Medical History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter past medical history',
        validation: {}
    },
    {
        id: 'drug_history',
        name: 'drug_history',
        label: 'Drug History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter drug history',
        validation: {}
    },
    {
        id: 'family_and_social_history',
        name: 'family_and_social_history',
        label: 'Family and Social History',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter family and social history',
        validation: {}
    },
    {
        id: 'examinations',
        name: 'examinations',
        label: 'Examinations',
        type: 'textarea',
        rows: 4,
        placeholder: 'Enter examination findings',
        validation: {}
    },
    {
        id: 'diagnosis',
        name: 'diagnosis',
        label: 'Diagnosis',
        type: 'text',
        placeholder: 'Enter diagnosis',
        validation: {},
        showAiSuggestions: false
    }
]

export default InternalMedicineFields;