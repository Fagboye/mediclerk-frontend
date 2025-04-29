const PediatricsFields = [
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
            required: 'Presenting complaints is required'
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
        id: 'past_medical_history',
        name: 'past_medical_history',
        label: 'Past Medical History',
        type: 'textarea',
        placeholder: 'Enter past medical history',
        rows: 4,
        validation: {}
    },
    {
        id: 'antenatal_history',
        name: 'antenatal_history',
        label: 'Antenatal History',
        type: 'textarea',
        placeholder: 'Enter antenatal history',
        rows: 4,
        validation: {}
    },
    {
        id: 'natal_history',
        name: 'natal_history',
        label: 'Natal History',
        type: 'textarea',
        placeholder: 'Enter natal history',
        rows: 4,
        validation: {}
    },
    {
        id: 'postnatal_history',
        name: 'postnatal_history',
        label: 'Postnatal History',
        type: 'textarea',
        placeholder: 'Enter postnatal history',
        rows: 4,
        validation: {}
    },
    {
        id: 'nutritional_history',
        name: 'nutritional_history',
        label: 'Nutritional History',
        type: 'textarea',
        placeholder: 'Enter nutritional history',
        rows: 4,
        validation: {}
    },
    {
        id: 'immunization_history',
        name: 'immunization_history',
        label: 'Immunization History',
        type: 'textarea',
        placeholder: 'Enter immunization history',
        rows: 4,
        validation: {}
    },
    {
        id: 'growth_and_developmental_history',
        name: 'growth_and_developmental_history',
        label: 'Growth and Developmental History',
        type: 'textarea',
        placeholder: 'Enter growth and developmental history',
        rows: 4,
        validation: {}
    },
    {
        id: 'drug_history',
        name: 'drug_history',
        label: 'Drug History',
        type: 'textarea',
        placeholder: 'Enter drug history',
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

export default PediatricsFields;
    

