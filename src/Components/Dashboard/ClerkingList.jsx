/**
 * ClerkingsList Component
 * Displays a list of clerking sessions with search functionality
 * Fetches clerking data from the server and handles loading/error states
 */
import ClerkingCard from './ClerkingCard';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const ClerkingsList = () => {
    // Authentication and state management
    const { accessToken } = useAuth();
    const [clerkings, setClerkings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Fetches clerking data from the server when component mounts
     * or when accessToken changes
     */
    useEffect(() => {
        let isMounted = true;

        const fetchClerkings = async () => {
            try {
                // Validate access token
                if (!accessToken) {
                    throw new Error('No access token available');
                }

                // Make API request
                const response = await api.get('/clerkpad/retrieve', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // Validate response
                if (!response?.data) {
                    throw new Error('No data received from server');
                }

                if (isMounted) {
                    setClerkings(response.data);
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching clerkings:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });

                // Handle specific error cases
                if (isMounted) {
                    if (error.response?.status === 401) {
                        setError('Unauthorized access. Please login again.');
                    } else if (error.response?.status === 404) {
                    setError('No clerkings found.');
                } else if (!navigator.onLine) {
                    setError('Network connection error. Please check your internet connection.');
                } else {
                        setError('Failed to fetch clerkings. Please try again later.');
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchClerkings();
    }, [accessToken]);

    /**
     * Updates search term state when user types in search input
     * @param {Event} e - The input change event
     */
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Show loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-blue-600">Loading clerkings...</div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main render - list of clerkings with search
    return (
        <div className="mt-16 px-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 bg-white shadow-sm rounded-lg p-6 mt-20">
                Clerking Sessions
            </h2>
            {/* Search input with icon */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search clerkings..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            {/* Conditional rendering based on clerkings data */}
            {clerkings.length === 0 ? (
                <div className="text-center text-gray-600">No clerkings found</div>
            ) : (
                <div className="grid gap-4">
                    {clerkings
                        .filter(clerking => 
                            clerking.clerking_note.first_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                            clerking.clerking_note.last_name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
                        )
                        .map((clerking) => (
                            <ClerkingCard key={clerking.id} id={clerking.id} specialty={clerking.specialty} clerking_note={clerking.clerking_note} created_at={clerking.created_at} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ClerkingsList;
