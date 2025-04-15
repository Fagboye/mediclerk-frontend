import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Error from '../Pages/Error/Error'
import NewClerkingSession from '../Pages/ClerkingSession/NewClerkingSession'


const MainLayout = () => {
  console.log('MainLayout is rendering');
  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/login' element={<Login />} />
           <Route path='/register' element={<Register />} />
           <Route path='/clerk' element={<NewClerkingSession />} />
           <Route path='*' element={<Error />} />
        </Routes>
    </BrowserRouter>
  );
};

export default MainLayout;
