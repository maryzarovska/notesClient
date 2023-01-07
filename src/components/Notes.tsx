import React, { useState } from 'react';
import { isErrored } from 'stream';

type NotesProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    notes: Note[],
    setNotes: (notes: Note[]) => void;
}

function Notes({ users, setUsers, notes, setNotes }: NotesProps) {
    const [userId, setUserId] = useState<number>(0);
    const [userText, setUserText] = useState<string>("");

    const addNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setNotes([...notes, {id: notes.length + 1, userId: userId, text: userText}])
    }

    return (
        <>
        <p>
            <select className='select1' onChange={(event) => setUserId(Number(event.target.value))}>
                {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
        </p>
        <ul>
            {notes.filter(note => note.userId === userId).map((note => <li key={note.id}>{note.text}</li>))}
        </ul>

        <input className='input1' type="text" value={userText} onChange = {(event) => setUserText(event.target.value)}/>
        <button className='button2' onClick={addNote}>Add</button>
        </>
    );
}

export default Notes;
