import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("user")
        navigate("/")

    }, []);
    return ( 
        <>
        </>
     );
}

export default Logout;