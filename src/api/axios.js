import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default api;
