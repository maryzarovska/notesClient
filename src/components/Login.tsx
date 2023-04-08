import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type UsersProps = {
    users: User[];
    setUsers: (users: User[]) => void;
}

function Login({ users, setUsers }: UsersProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate()

    const login = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const user = users.find(user => user.username === username && user.password === password)
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/")
        }
    }

    return ( 
        <>
            <p>
                <input className='input1' type="text" value={username} onChange={(event) => setUsername(event.target.value)} /><br/>
                <input className='input1' type="text" value={password} onChange={(event) => setPassword(event.target.value)} /><br/><br/>
                <button className='button2' onClick={login}>Log In</button>
            </p>
        </>
     );
}

export default Login;