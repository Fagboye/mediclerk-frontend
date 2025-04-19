

const ClerkingDetails = () => {

    // Common styles
    const sectionStyles = "mb-6 border-b pb-4";
    const headingStyles = "text-xl font-semibold text-gray-700 mb-2";
    const subHeadingStyles = "text-lg font-medium text-gray-600 mb-1";
    const textStyles = "text-gray-600";

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" id="content">
            {/* specialty section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Specialty</h2>
                <p className={textStyles}>Internal Medicine</p>
            </div>

            {/* patient details section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Patient Details</h2>
                <h3 className={subHeadingStyles}>Name: John Doe</h3>
                <h3 className={subHeadingStyles}>Biodata</h3>
                <p className={textStyles}>Age: 45 years old, Gender: Male, Occupation: Teacher, Marital Status: Married, Religion: Christian, Ethnicity: Caucasian, Address: 123 Main Street, Contact: (555) 123-4567, Next of Kin: Jane Doe (Wife), Emergency Contact: (555) 987-6543</p>
            </div>

            {/* presenting complaints section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Presenting Complaints</h2>
                <p className={textStyles}>Fever, cough and difficulty breathing for 5 days</p>
            </div>

            {/* history of presenting complaints section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>History of Presenting Complaints</h2>
                <p className={textStyles}>Patient developed high grade fever 5 days ago, associated with dry cough and progressive difficulty in breathing. No chest pain or hemoptysis. No recent travel history or contact with COVID-19 patients.</p>
            </div>

            {/* past medical history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Past Medical History</h2>
                <p className={textStyles}>Hypertension diagnosed 10 years ago, on regular medication. No history of diabetes, asthma or tuberculosis.</p>
            </div>

            {/* drug history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Drug History</h2>
                <p className={textStyles}>Amlodipine 5mg daily for hypertension. No known drug allergies.</p>
            </div>

            {/* family history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Family History</h2>
                <p className={textStyles}>Father died of myocardial infarction at age 65. Mother alive and well. No family history of diabetes or cancer.</p>
            </div>

            {/* social history section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Social History</h2>
                <p className={textStyles}>Non-smoker, occasional alcohol consumption. Lives with wife and two children. No recreational drug use.</p>
            </div>

            {/* examinations section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Examinations</h2>
                <p className={textStyles}>Temperature: 38.5°C, Pulse: 90 bpm, Respiratory Rate: 20/min, Blood Pressure: 120/80 mmHg</p>
            </div>

            {/* diagnosis section */}
            <div className={sectionStyles}>
                <h2 className={headingStyles}>Diagnosis</h2>
                <p className={textStyles}>Suspected COVID-19 infection</p>
            </div>
        </div>
    )
}

export default ClerkingDetails;
