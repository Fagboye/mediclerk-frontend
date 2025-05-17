import NavbarLoggedIn from "../../Components/Navbar/NavbarLoggedIn";
import ClerkingDetails from "../../Components/Clerking/ClerkingDetails";
import ActionButtons from "../../Components/Clerking/ActionButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const ClerkingView = () => {
    const { id } = useParams();
    const { accessToken } = useAuth();
    const [clerking, setClerking] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClerking = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Validate id exists
                if (!id) {
                    throw new Error('Clerking ID is required');
                }

                const response = await api.get(`/clerkpad/retrieve/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (!response?.data) {
                    throw new Error('No data received');
                }

                setClerking(response.data);
            } catch (err) {
                console.error('Error fetching clerking:', err);
                setError(err.message || 'Failed to fetch clerking details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClerking();
    }, [id, accessToken]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <div className="ml-4 text-lg text-gray-600">
                    <div className="animate-pulse">Loading clerking details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    if (!clerking) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
                <div className="text-red-600">Clerking not found</div>
            </div>
        );
    }

    return (
        <div>
            <NavbarLoggedIn />
            {/* Add margin-top to account for fixed navbar height */}
            <div className="container mx-auto p-4 mt-20">
                {/*action buttons*/}
                <div className="w-full max-w-7xl mx-auto px-1 sm:px-8 py-4">
                    <div className="flex justify-end">
                        <ActionButtons id={id} clerking={clerking}/>
                    </div>
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
