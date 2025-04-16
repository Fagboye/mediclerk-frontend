import ClerkingCard from './ClerkingCard';

const mockClerking = [
    {
        id: 1,
        title: 'Clerking 1',
        description: 'Description 1',
        created_at: '2021-01-01'
    },
    {
        id: 2,
        title: 'Clerking 2',
        description: 'Description 2',
        created_at: '2021-01-02'
    },
    {
        id: 3,
        title: 'Clerking 3',
        description: 'Description 3',
        created_at: '2021-01-03'
    }
]   
const ClerkingsList = () => {

    try {
        return (
            <div className="mt-16 px-4">
                <h2 className="text-2xl font-bold mb-4">Clerking List</h2>
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

