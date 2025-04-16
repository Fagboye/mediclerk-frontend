
const ClerkingCard = ({clerking}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{clerking.title}</h3>
            <p className="text-gray-600 mb-2">{clerking.description}</p>
            <p>{clerking.created_at}</p>
            
        </div>
    )
}

export default ClerkingCard;