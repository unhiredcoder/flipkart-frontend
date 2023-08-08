import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = (props) => {
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            navigate('/');
        } else if (userData.role !== 'admin' && userData.role !== 'superadmin') {
            // Redirect if user role is not allowed (neither admin nor superadmin)
            navigate('/');
        }
    }, [navigate]);


    return (
        <>
            <Component />
        </>
    );
};

export default PrivateRoutes;
