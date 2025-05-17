import Navbar from '../../Components/Navbar/Navbar'
import doctor from '../../assets/doctor.jpg'
import medicine from '../../assets/medicine.png'
import surgery from '../../assets/surgery.png'
import pediatrics from '../../assets/pediatrics.png'
import OG from '../../assets/O&G.png'
import clerkingAI from '../../assets/clerking ai.png'
import clerkingList from '../../assets/clerking list.png'
import clerkingDetails from '../../assets/clerking details.png'
import clerkingTemplate from '../../assets/clerking template.png'


const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Main container aligned with Navbar width */}
      <div className="w-full max-w-7xl mx-auto px-2">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-12 sm:py-16 bg-white mt-15">
          <div className="lg:w-1/2 mb-10 lg:mb-0 bg-white p-0 sm:p-6 rounded-lg">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
              Electronic Clerking For Medical Students with AI Companion
            </h2>
            <p className="text-[#4D4D4D] mb-8 text-base sm:text-lg font-semibold leading-relaxed max-w-xl">
              Streamline your medical clerking workflow with intelligent AI assistance. Create comprehensive patient notes in minutes.
            </p>
            {/* <button className="bg-[#3461FF] text-white font-medium px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">New Clerking</button> */}
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={doctor}
              alt="Doctor Illustration"
              className="w-full h-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
            />
          </div>
        </section>

        {/* Specialist Section */}
        <section className="px-0 sm:px-8 py-12 sm:py-16 mt-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-blue-800">Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              { name: "Internal Medicine", icon: medicine },
              { name: "Surgery", icon: surgery },
              { name: "Pediatrics", icon: pediatrics },
              { name: "Obstetrics & Gynecology", icon: OG },
            ].map((specialty) => (
              <div 
                key={specialty.name} 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <img src={specialty.icon} alt={`${specialty.name} icon`} className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800">{specialty.name}</h3>
              </div>
            ))}
          </div>
        </section>
        {/* Features section styled like the provided image */}
        <section className="py-16 mt-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-16 text-blue-800">Features</h2>
          <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-8">
            {/* Clerking List */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-2">Clerking List</h3>
              <p className="text-center text-gray-700 max-w-2xl mb-6">View all your clerking sessions in one organized page with patient history and status.</p>
              <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg" style={{background: "linear-gradient(90deg, #7F9CF5 0%, #F472B6 100%)"}}>
                <img src={clerkingList} alt="clerking list" className="w-full object-cover" />
              </div>
            </div>

            {/* Full Patient Clerking Details */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-2">Full Patient Clerking Details</h3>
              <p className="text-center text-gray-700 max-w-2xl mb-6">Access complete patient records with complaints, history, examinations and diagnosis in a structured format.</p>
              <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg" style={{background: "linear-gradient(90deg, #A7F3D0 0%, #FDE68A 100%)"}}>
                <img src={clerkingDetails} alt="clerking details" className="w-full object-cover" />
              </div>
            </div>

            {/* Specialty selection and Form Template */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-2">Specialty Selection and Form Template</h3>
              <p className="text-center text-gray-700 max-w-2xl mb-6">Use specialized templates for Internal Medicine, Surgery, Pediatrics, and OB/GYN to capture relevant information.</p>
              <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg" style={{background: "linear-gradient(90deg, #FDE68A 0%, #F472B6 100%)"}}>
                <img src={clerkingTemplate} alt="clerking template" className="w-full object-cover" />
              </div>
            </div>

            {/* AI-assisted Question Suggestions */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-2">AI-assisted Question Suggestions</h3>
              <p className="text-center text-gray-700 max-w-2xl mb-6">Get smart AI suggestions for relevant questions based on patient symptoms and specialty.</p>
              <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg" style={{background: "linear-gradient(90deg, #A7F3D0 0%, #7F9CF5 100%)"}}>
                <img src={clerkingAI} alt="clerking ai suggestions" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;