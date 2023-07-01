import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../application-store/userSlice';


function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout())
        navigate("/")

    }, []);
    return ( 
        <>
        </>
     );
}

export default Logout;