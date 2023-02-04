import axios from 'axios';
import React, { useState } from 'react';

type UsersProps = {
    users: User[];
    setUsers: (users: User[]) => void;
}

function Register({ users, setUsers }: UsersProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const addUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (username === "" || password ==="") {
            return;
        }

        axios.post<User>("http://localhost:5000/users", {
            username:username, password:password
        }).then(response => {
            setUsers([...users, response.data]);
            setUsername("");
            setPassword("");
        })
    };

    return ( 
        <>
            <p>
                <input className='input1' type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                <input className='input1' type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button className='button2' onClick={addUser}>Add</button>
            </p>
        </>
     );
}

export default Register;