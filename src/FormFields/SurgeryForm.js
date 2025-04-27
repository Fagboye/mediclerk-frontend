const SurgeryFields = [
    {
        id: 'patient_biodata',
        name: 'patient_biodata',
        label: 'Patient Biodata',
        type: 'textarea',
        placeholder: 'Enter patient biodata',
        rows: 4,
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
        placeholder: 'Enter presenting complaints',
        rows: 4,
        validation: {
            required: 'Presenting complaint is required'
        },
        showAiSuggestions: false
    },
    {
        id: 'history_of_presenting_complaints',
        name: 'history_of_presenting_complaints',
        label: 'History of Presenting Complaints',
        type: 'textarea', 
        placeholder: 'Enter history of presenting complaints',
        rows: 4,
        validation: {
            required: 'History of presenting complaint is required'
        }
    },
    {
        id: 'past_surgical_history',
        name: 'past_surgical_history',
        label: 'Past Surgical History',
        type: 'textarea',
        placeholder: 'Enter past surgical history',
        rows: 4,
        validation: {
            required: 'Past surgical history is required'
        }
    },
    {
        id: 'drug_history',
        name: 'drug_history',
        label: 'Drug History',
        type: 'textarea',
        placeholder: 'Enter drug history',
        rows: 4,
        validation: {
            required: 'Drug history is required'
        }
    },
    {
        id: 'family_history',
        name: 'family_history',
        label: 'Family History',
        type: 'textarea',
        placeholder: 'Enter family history',
        rows: 4,
        validation: {
            required: 'Family history is required'
        }
    },
    {
        id: 'social_history',
        name: 'social_history',
        label: 'Social History',
        type: 'textarea',
        placeholder: 'Enter social history', 
        rows: 4,
        validation: {
            required: 'Social history is required'
        }
    },
    {
        id: 'examinations',
        name: 'examinations',
        label: 'Examinations',
        type: 'textarea',
        placeholder: 'Enter examination findings',
        rows: 4,
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

export default SurgeryFields;