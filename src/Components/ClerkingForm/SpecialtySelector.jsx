const SpecialtySelector = ({specialties, selectedSpecialty, onSelect}) => {
    const styles = {
        container: "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:p-6",
        button: {
            base: "w-full flex flex-col items-center p-4 sm:p-8 rounded-xl transition-all duration-300 ease-in-out transform active:scale-95 sm:hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group touch-manipulation",
            selected: "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 shadow-lg",
            unselected: "bg-white border border-gray-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
        },
        text: {
            title: "text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-700 transition-colors duration-200",
            description: "text-xs sm:text-sm text-gray-600 text-center leading-relaxed opacity-90 group-hover:text-gray-700"
        },
        glow: "absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl blur-lg"
    };

    return (
        <div className={styles.container}>
            {specialties.map((specialty) => (
                <button
                    key={specialty.id}
                    onClick={() => onSelect(specialty.id)}
                    className={`${styles.button.base} ${
                        selectedSpecialty === specialty.id 
                        ? styles.button.selected
                        : styles.button.unselected
                    }`}
                >
                    <div className={styles.glow}></div>
                    <h3 className={styles.text.title}>
                        {specialty.name}
                    </h3>
                    {specialty.description && (
                        <p className={styles.text.description}>
                            {specialty.description}
                        </p>
                    )}
                </button>
            ))}
        </div>
    );
};

export default SpecialtySelector;
