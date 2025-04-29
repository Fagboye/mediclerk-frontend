const ObsGynFields = [
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
        placeholder: 'Enter remaining patient biodata',
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
            required: 'Presenting complaints are required'
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
        validation: {}
    },
    {
        id: 'past_gynaecological_history',
        name: 'past_gynaecological_history',
        label: 'Past Gynaecological History',
        type: 'textarea',
        placeholder: 'Enter past gynaecological history',
        rows: 4,
        validation: {}
    },
    {
        id: 'past_obstetrical_history',
        name: 'past_obstetrical_history',
        label: 'Past Obstetrical History',
        type: 'textarea',
        placeholder: 'Enter past obstetrical history',
        rows: 4,
        validation: {}
    },
    {
        id: 'past_medical_history',
        name: 'past_medical_history',
        label: 'Past Medical History',
        type: 'textarea',
        placeholder: 'Enter past medical history',
        rows: 4,
        validation: {}
    },
    {
        id: 'family_and_social_history',
        name: 'family_and_social_history',
        label: 'Family and Social History',
        type: 'textarea',
        placeholder: 'Enter family and social history',
        rows: 4,
        validation: {}
    },
    {
        id: 'examinations',
        name: 'examinations',
        label: 'Examinations',
        type: 'textarea',
        placeholder: 'Enter examinations',
        rows: 4,
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

export default ObsGynFields;

