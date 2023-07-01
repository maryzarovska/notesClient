import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { login as loginAction } from '../application-store/userSlice';

type LoginProps = {
    users: User[];
    setUsers: (users: User[]) => void;
}

function Login({ users, setUsers }: LoginProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const login = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const userToLogin = users.find(user => user.username === username && user.password === password)
        if (userToLogin) {
            dispatch(loginAction(userToLogin));
            navigate("/")
        }
        else setErrorMessage("User does not exist. Register")
    }

    return ( 
        <>
            <p>
                <input className='input1' type="text" value={username} onChange={(event) => {
                    setUsername(event.target.value)
                    setErrorMessage("")
                    }} /><br/>
                <input className='input1' type="password" value={password} onChange={(event) => {
                    setPassword(event.target.value)
                    setErrorMessage("")
                    }} /><br/><br/>
                <button className='button2' onClick={login}>Log In</button>
            </p>

            <p>
                {errorMessage}
            </p>
        </>
     );
}

export default Login;