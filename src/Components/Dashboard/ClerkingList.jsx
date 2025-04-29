/**
 * ClerkingsList Component
 * 
 * A component that displays a list of clerking sessions with search functionality.
 * Handles fetching data, loading states, error handling, and search filtering.
 * 
 * @component
 */
import ClerkingCard from './ClerkingCard';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const ClerkingsList = () => {
    // State management
    const { accessToken } = useAuth();
    const [clerkings, setClerkings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Fetches clerking data from the API
     * 
     * @async
     * @function fetchClerkings
     * @throws {Error} When API request fails or returns invalid data
     */
    useEffect(() => {
        let isMounted = true;

        const fetchClerkings = async () => {
            try {
                if (!accessToken) {
                    throw new Error('No access token available');
                }

                const response = await api.get('/clerkpad/retrieve', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

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
     * Handles search input changes
     * 
     * @param {Object} e - Event object
     */
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Loading state UI
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 sm:px-0">
                <div className="text-base sm:text-lg md:text-xl text-blue-600 animate-pulse">
                    Loading clerkings...
                </div>
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto mt-8 sm:mt-12 md:mt-16">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-sm sm:text-base text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main render UI
    return (
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mt-16 sm:mt-20">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 bg-white shadow-sm rounded-lg p-4 sm:p-5 mb-6">
                Clerking Notes
            </h2>

            {/* Search input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search for a clerking note..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             shadow-sm text-sm sm:text-base placeholder-gray-400"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Clerking list */}
            {clerkings.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm sm:text-base">No clerkings found</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-5 md:gap-6">
                    {clerkings
                        .filter(clerking => 
                            clerking.clerking_note.first_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                            clerking.clerking_note.last_name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
                        )
                        .map((clerking) => (
                            <ClerkingCard 
                                key={clerking.id} 
                                id={clerking.id} 
                                specialty={clerking.specialty} 
                                clerking_note={clerking.clerking_note} 
                                created_at={clerking.created_at} 
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ClerkingsList;
