const SpecialtySelector = ({specialties, selectedSpecialty, onSelect}) => {
    const baseButtonStyles = "flex flex-col items-center p-6 rounded-lg transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg";
    const selectedButtonStyles = "bg-blue-50 border-2 border-blue-500";
    const unselectedButtonStyles = "bg-white border border-gray-200 hover:border-blue-300";
    const titleStyles = "text-lg font-semibold text-gray-800 mb-2";
    const descriptionStyles = "text-sm text-gray-600 text-center";
    const containerStyles = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4";

    return (
        <div className={containerStyles}>
            {specialties.map((specialty) => (
                <button
                    key={specialty.id}
                    onClick={() => onSelect(specialty.id)}
                    className={`${baseButtonStyles} ${
                        selectedSpecialty === specialty.id 
                        ? selectedButtonStyles 
                        : unselectedButtonStyles
                    }`}
                >
                    <h3 className={titleStyles}>
                        {specialty.name}
                    </h3>
                    {specialty.description && (
                        <p className={descriptionStyles}>
                            {specialty.description}
                        </p>
                    )}
                </button>
            ))}
        </div>
    );
};

export default SpecialtySelector;
