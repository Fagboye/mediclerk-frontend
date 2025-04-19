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

const MainLayout = () => {
  console.log('MainLayout is rendering');
  return (
    <BrowserRouter>
        <AuthProvider>
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/login' element={<Login />} />
           <Route path='/register' element={<Register />} />
           <Route path='/clerkings' element={<DashBoard />} />
           <Route path='/clerkings/new' element={<NewClerkingSession />} />
           <Route path='/clerkings/:id' element={<ClerkingView />} />
           <Route path='*' element={<Error />} />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default MainLayout;
