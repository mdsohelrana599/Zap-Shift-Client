import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user, loading}= useAuth();
    const location = useLocation()
    
    if(loading){
        return  <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div> 
    }

    if(!user){
    
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;