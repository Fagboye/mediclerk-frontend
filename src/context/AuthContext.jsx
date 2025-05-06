/**
 * Authentication Context and Provider
 * 
 * Provides authentication state management and related functionality across the application.
 * Handles user login/logout and token management using session storage.
 */

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router';

// Create context for authentication state
export const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages authentication state and provides auth-related functions to children
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped
 */
export const AuthProvider = ({ children }) => {
    // Initialize state from session storage if available
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('access_token') || null);
    const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('user')) || null);
    const navigate = useNavigate();

    // Persist access token to session storage when it changes
    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem('access_token', accessToken);
        } else {
            sessionStorage.removeItem('access_token');
        }
    }, [accessToken]);

    // Persist user data to session storage when it changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);
    
    /**
     * Authenticates user with email and password
     * 
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @throws {Error} If login fails or server response is invalid
     */
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            if (!response?.data?.access_token) {
                throw new Error('Invalid response from server');
            }

            setAccessToken(response.data.access_token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw new Error('Login failed. Please check your credentials.');
        }
    };

    /**
     * Logs out the current user
     * Clears auth state and redirects to login page
     */
    const logout = async () => {
        try {
            // Clear auth state
            setAccessToken(null);
            setUser(null);
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
            navigate('/login');

            // Optional: Call logout endpoint if needed
            // await api.post('/logout');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    const value = useMemo(() => ({
        accessToken,
        user,
        login,
        logout
    }), [accessToken, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access authentication context
 * 
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
