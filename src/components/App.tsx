import React, { useEffect, useState } from 'react';
import Home from './Home';
import Notes from './Notes';
import Users from './Users';

import './App.css';

function App() {
    const [page, setPage] = useState<string>("home");
    const [users, setUsers] = useState<User[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        setUsers([
            { id: 1, name: 'John', age: 18 },
            { id: 2, name: 'Alice' },
            { id: 3, name: 'Tom', age: 19 },
            { id: 4, name: 'Bob', age: 16 }
        ]);
        setNotes([
            { id: 1, userId: 1, text: "Text 1" },
            { id: 2, userId: 1, text: "Text 2" },
            { id: 3, userId: 2, text: "Text 3" },
            { id: 4, userId: 4, text: "Text 4" }
        ]);
    }, []);

    return (
        <>
            <p>
                <button className='navbutton' onClick={() => setPage("home")}>Home</button>
                <button className='navbutton' onClick={() => setPage("users")}>Users</button>
                <button className='navbutton' onClick={() => setPage("notes")}>Notes</button>
            </p>
            { page === "home" && <Home /> }
            { page === "users" && <Users users={users} setUsers={setUsers} /> }
            { page === "notes" && <Notes users={users} setUsers={setUsers} notes={notes} setNotes={setNotes}/> }
        </>
    );
}

export default App;
