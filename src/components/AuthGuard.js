import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const isAuthenticated = localStorage.getItem('login');

    if (!isAuthenticated) {
       
        return <Navigate to="/Login" />;
        
    }

    return children;
};

export default AuthGuard;
