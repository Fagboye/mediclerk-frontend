import NavbarLoggedIn from "../../Components/Navbar/NavbarLoggedIn";
import ClerkingDetails from "../../Components/Clerking/ClerkingDetails";
import ActionButtons from "../../Components/Clerking/ActionButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const ClerkingView = () => {

    const {id} = useParams();
    const [clerking, setClerking] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClerking = async () => {
            try {
                setError(null); // Reset error state before fetching
                const response = await api.get(`/clerkings/${id}`);
                if (!response.data) {
                    throw new Error("No data returned from API");
                }
                setClerking(response.data);
            } catch (error) {
                // Log with context
                console.error(`Error fetching clerking with id ${id}:`, error);
                // Set user-friendly error message
                if (error.response) {
                    setError(`Server error: ${error.response.status}`);
                } else if (error.request) {
                    setError("Network error: Unable to reach the server.");
                } else {
                    setError("Unexpected error occurred.");
                }
            }
        };
        fetchClerking();
    }, [id]);
    
    return (
        <div>
            <NavbarLoggedIn />
            {/* Add margin-top to account for fixed navbar height */}
            <div className="container mx-auto p-4 mt-20">
                {/*action buttons*/}
                <div className="flex justify-end mb-4">
                    <ActionButtons />
                </div>
                {/*clerking details*/}
                <div>
                    <ClerkingDetails clerking={clerking} />
                </div>
            </div>
        </div>
    )
}

export default ClerkingView;
