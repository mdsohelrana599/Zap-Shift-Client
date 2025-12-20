import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const{user, loading}= useAuth();
    const location = useLocation()
    
    if(loading){
        return  <Loading></Loading>
    }

    if(!user){
    
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;