import React, { useEffect, useState } from 'react';
import Home from './Home';
import Notes from './Notes';
import Users from './Users';
import Register from './Register';
import axios from 'axios';

import './App.css';

function App() {
    const [page, setPage] = useState<string>("home");
    const [users, setUsers] = useState<User[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        axios.get<User[]>("http://localhost:5000/users").then(response => {
            setUsers(response.data);
            console.log(response.data);
        });

        axios.get<Note[]>("http://localhost:5000/notes").then(response => {
            setNotes(response.data);
            console.log(response.data);
        });

    }, []);

    return (
        <>
            <p>
                <button className='navbutton' onClick={() => setPage("home")}>Home</button>
                <button className='navbutton' onClick={() => setPage("users")}>Users</button>
                <button className='navbutton' onClick={() => setPage("notes")}>Notes</button>
                <button className='navbutton' onClick={() => setPage("register")}>Register</button>
            </p>
            { page === "home" && <Home /> }
            { page === "users" && <Users users={users} setUsers={setUsers} /> }
            { page === "notes" && <Notes users={users} setUsers={setUsers} notes={notes} setNotes={setNotes}/> }
            { page === "register" && <Register users={users} setUsers={setUsers} /> }
        </>
    );
}

export default App;
