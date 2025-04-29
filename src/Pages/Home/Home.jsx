import Navbar from '../../Components/Navbar/Navbar'
import doctor from '../../assets/doctor.jpg'
import medicine from '../../assets/medicine.png'
import surgery from '../../assets/surgery.png'
import pediatrics from '../../assets/pediatrics.png'
import OG from '../../assets/O&G.png'

const Home = () => {
  return (
    <div>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 bg-white">
          <div className="lg:w-1/2 mb-10 lg:mb-0 bg-white p-6 rounded-lg">
            <h2 className="text-4xl font-semibold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">Electronic Clerking For Medical Students with AI Companion</h2>
            <p className="text-[#4D4D4D] mb-8 text-lg font-semibold leading-relaxed max-w-xl">Streamline your medical clerking workflow with intelligent AI assistance. Create comprehensive patient notes in minutes.</p>
            {/* <button className="bg-[#3461FF] text-white font-medium px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">New Clerking</button> */}
          </div>
          <div className="lg:w-1/2">
            <img
              src={doctor}
              alt="Doctor Illustration"
              className="w-full h-auto max-w-2xl mx-auto"
            />
          </div>
        </section>

        {/* Specialist Section */}
        <section className="px-8 py-16 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { name: "Internal Medicine", icon: medicine },
              { name: "Surgery", icon: surgery },
              { name: "Pediatrics", icon: pediatrics },
              { name: "Obstetrics & Gynecology", icon: OG },
            ].map((specialty) => (
              <div 
                key={specialty.name} 
                className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <img src={specialty.icon} alt={`${specialty.name} icon`} className="w-20 h-20 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-blue-800">{specialty.name}</h3>
              </div>
            ))}
          </div>
        </section>

    </div>
  );
};

export default Home;