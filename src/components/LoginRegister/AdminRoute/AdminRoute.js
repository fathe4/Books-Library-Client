import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../../../hooks/UseAuth';


const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = UseAuth();
    const location = useLocation();
    if (isLoading) {
        return <div className='spinner text-center mt-5'><Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner> </div>
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoute;