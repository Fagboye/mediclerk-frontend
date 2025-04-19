import ClerkingCard from './ClerkingCard';

const mockClerking = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Smith',
        specialty: 'Internal Medicine',
        diagnosis: 'Community Acquired Pneumonia',
        created_at: '2024-01-15 09:30 AM'
    },
    {
        id: 2,
        first_name: 'Sarah',
        last_name: 'Johnson',
        specialty: 'Surgery',
        diagnosis: 'Acute Appendicitis',
        created_at: '2024-01-14 02:15 PM'
    },
    {
        id: 3,
        first_name: 'Michael',
        last_name: 'Williams',
        specialty: 'Internal Medicine',
        diagnosis: 'Acute Kidney Injury',
        created_at: '2024-01-13 11:45 AM'
    }
]   
const ClerkingsList = () => {

    try {
        return (
            <div className="mt-16 px-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-800 bg-white shadow-sm rounded-lg p-6 mt-20">
                    Clerking Sessions
                </h2>
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search clerkings..."
                        className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="grid gap-4">
                    {mockClerking.map((clerking) => (
                        <ClerkingCard key={clerking.id} clerking={clerking} />
                    ))}
                </div>
            </div>
        )
    } catch (error) {
        console.error('Error fetching clerkings:', error);
        return <div className='text-red-500'>failed to load Clerkings</div>;
    }
};

export default ClerkingsList;

