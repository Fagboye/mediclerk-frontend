import { createContext, useContext, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router';



export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    
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

    const logout = async () => {
        try {
            // Clear auth state
            setAccessToken(null);
            setUser(null);
            navigate('/login');

            // Optional: Call logout endpoint if needed
            // await api.post('/logout');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    const value = {
        accessToken,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

