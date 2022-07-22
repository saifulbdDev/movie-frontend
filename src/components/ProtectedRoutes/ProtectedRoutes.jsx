import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../../pages/Login/Login';

function ProtectedRoutes() {
    const { jwt_token } = useSelector((state) => state.auth)

    return jwt_token ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
