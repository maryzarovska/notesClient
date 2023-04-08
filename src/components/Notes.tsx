import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isErrored } from 'stream';
import {Routes, Route, Link} from 'react-router-dom'; 

type NotesProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    notes: Note[],
    setNotes: (notes: Note[]) => void;
}

function Notes({ users, setUsers, notes, setNotes }: NotesProps) {
    const [username, setUsername] = useState<string>("");
    const [userText, setUserText] = useState<string>("");
    useEffect(() => {
        setUsername(users[0].username);
    }, [])

    const addNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(userText === "") {
            return;
        }
        axios.post<Note>("http://localhost:5000/notes", {
            username:username, text:userText
        }).then(response => {
            setNotes([...notes, response.data]);
            setUserText("");
        });
    }

    return (
        <>
        {/* <p>
            <select className='select1' onChange={(event) => setUsername(event.target.value)}>
                {users.map(user => <option key={user._id} value={user.username}>{user.username}</option>)}
            </select>
        </p> */}

        

        <ul>
            {notes.filter(note => note.username === username).map((note => <li key={note._id}><Link to={`/notes/${note._id}`}>{note.text}</Link></li>))}
        </ul>

        <input className='input1' type="text" value={userText} onChange = {(event) => setUserText(event.target.value)}/>
        <button className='button2' onClick={addNote}>Add</button>
        </>
    );
}

export default Notes;
