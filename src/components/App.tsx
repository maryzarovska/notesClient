import React, { useEffect, useState } from 'react';
import Home from './Home';
import Notes from './Notes';
import Users from './Users';
import Register from './Register';
import IdNote from './IdNote';
import Login from './Login';
import Logout from './Logout';
import axios from 'axios';
import {Routes, Route, Link} from 'react-router-dom'; 

import './App.css';
import NotFound from './NotFound';

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
                {/* <button className='navbutton' onClick={() => setPage("home")}>Home</button>
                <button className='navbutton' onClick={() => setPage("users")}>Users</button>
                <button className='navbutton' onClick={() => setPage("notes")}>Notes</button>
                <button className='navbutton' onClick={() => setPage("register")}>Register</button> */}

                <Link to='/' className='navbutton'>Home</Link>
                <Link to='/users' className='navbutton'>Users</Link>
                <Link to='/notes' className='navbutton'>Notes</Link>
                <Link to='/register' className='navbutton'>Register</Link>
                <Link to='/login' className='navbutton'>Log In</Link>
                <Link to='/logout' className='navbutton'>Log Out</Link>
            </p>
            {/* { page === "home" && <Home /> }
            { page === "users" && <Users users={users} setUsers={setUsers} /> }
            { page === "notes" && <Notes users={users} setUsers={setUsers} notes={notes} setNotes={setNotes}/> }
            { page === "register" && <Register users={users} setUsers={setUsers} /> } */}

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/users' element={<Users users={users} setUsers={setUsers} />}/>
                
                <Route path='/notes'>
                    <Route index element={<Notes users={users} setUsers={setUsers} notes={notes} setNotes={setNotes}/>}/>
                    <Route path=':id' element={<IdNote notes={notes} setNotes={setNotes} />} />
                </Route>
                <Route path='/register' element={<Register users={users} setUsers={setUsers} />}/>
                <Route path='/login' element={<Login users={users} setUsers={setUsers} />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
