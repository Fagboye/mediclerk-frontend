/**
 * MainLayout Component
 * 
 * Top-level component that handles routing and authentication context for the application.
 * Defines the main route structure and wraps all routes with AuthProvider.
 */

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Error from '../Pages/Error/Error'
import NewClerkingSession from '../Pages/NewClerking/NewClerkingSession'
import { AuthProvider } from '../context/AuthContext'
import DashBoard from '../Pages/ClerkingList/DashBoard'
import ClerkingView from '../Pages/ClerkingView/ClerkingView'
import UpdateClerkingSession from '../Pages/UpdateClerking/UpdateClerkingSession'

/**
 * MainLayout component that sets up routing and authentication context
 * @returns {JSX.Element} The rendered component
 */
const MainLayout = () => {
  console.log('MainLayout is rendering');
  return (
    <BrowserRouter>
        <AuthProvider>
        <Routes>
           {/* Public routes */}
           <Route path='/' element={<Home />} />
           <Route path='/login' element={<Login />} />
           <Route path='/register' element={<Register />} />
           
           {/* Clerking routes - nested under /clerkings */}
           <Route path='/clerkings'>
             <Route index element={<DashBoard />} />
             <Route path='new' element={<NewClerkingSession />} />
             {/* Dynamic clerking routes with ID parameter */}
             <Route path=':id'>
               <Route index element={<ClerkingView />} />
               <Route path='update' element={<UpdateClerkingSession />} />
             </Route>
           </Route>
           
           {/* Catch-all route for 404 errors */}
           <Route path='*' element={<Error />} />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default MainLayout;
