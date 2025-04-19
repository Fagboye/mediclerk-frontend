const ClerkingCard = ({clerking}) => {
    return (
        <div 
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 border border-gray-100 w-full cursor-pointer"
            onClick={() => {/* Add navigation logic here */}}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    {clerking.first_name} {clerking.last_name}
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-colors">
                    {clerking.specialty}
                </span>
            </div>
            <div className="space-y-3">
                <div className="flex items-baseline">
                    <p className="text-gray-700 font-medium w-24">Diagnosis:</p>
                    <p className="text-gray-600 font-semibold italic">{clerking.diagnosis}</p>
                </div>
                <div className="flex items-baseline">
                    <p className="text-gray-700 font-medium w-24">Created:</p>
                    <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {clerking.created_at}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClerkingCard;