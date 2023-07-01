import axios from 'axios';
import React, { useState } from 'react';

type UsersProps = {
    users: User[];
    setUsers: (users: User[]) => void;
}

function Register({ users, setUsers }: UsersProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const addUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (username === "" || password ==="") {
            setErrorMessage("Username and password are required")
            return;
        }

        for (let i = 0; i < users.length; i++) {
            if(username === users[i].username) {
                //alert("Username already exists");
                setErrorMessage("Username already exists");
                return;
            }
        }

        axios.post<User>("http://localhost:5000/users", {
            username:username, password:password, email:email
        }).then(response => {
            setUsers([...users, response.data]);
            setUsername("");
            setPassword("");
            setEmail("");
        })
    };

    return ( 
        <>
            <p>
                <input className='input1' type="text" value={username} onChange={(event) => {
                    setUsername(event.target.value)
                    setErrorMessage("")
                    }} />
                <input className='input1' type="text" value={password} onChange={(event) => {
                    setPassword(event.target.value)
                    setErrorMessage("")
                    }} />
                <input className='input1' type="text" value={email} onChange={(event) => {
                    setEmail(event.target.value)
                    setErrorMessage("")
                    }} />
                <button className='button2' onClick={addUser}>Add</button>
            </p>
            <p>
                {errorMessage}
            </p>
        </>
     );
}

export default Register;