import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

import Register from './pages/Register/Register';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieAdd from './pages/AddMovie/AddMovie';
export default function App() {
    

    return (
        <>
            <Header/>
            <main className='main'>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-movie" element={<MovieAdd />} />
                   
                </Route>
            </Routes>
            </main>
            <Footer/>
            <ToastContainer />
        </>
    );
}
