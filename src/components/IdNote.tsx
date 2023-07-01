import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type IdNoteProps = {
    notes: Note[],
    setNotes: (notes: Note[]) => void;
}

function IdNote({ notes, setNotes }: IdNoteProps) {
    const { id } = useParams()
    const [note, setNote] = useState<Note>();
    const [editState, setEditState] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    useEffect(() => {
        setNote(notes.find((note) => note._id === id))
    }, [notes.length])

    const navigate = useNavigate();

    const edit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditState(true);
    }

    const saveNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (note?.text === "") {
            setErrorMessage("Note must contain at least one symbol")

        }
        else {
            setEditState(false);

            axios.put<Note | null>(`http://localhost:5000/notes/${note?._id}`, note).then(response => {
                if (note) {
                    const temp = [];
                    for (let i = 0; i < notes.length; i++) {
                        if (notes[i]._id !== note._id) {
                            temp.push(notes[i]);
                        }
                        else temp.push(note)
                    }
                    setNotes(temp)
                }
            })
        }

    }

    const deleteNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        axios.delete<Note | null>(`http://localhost:5000/notes/${note?._id}`).then(response => {
            if (response.data) {
                setNotes(notes.filter(note => note._id !== response.data?._id))
                navigate("/notes")
            }
        })
    }
    return (
        <>
            <h3>
                {note?.username}
            </h3>

            <p>
                {editState ?
                    <>
                        <input type="text" value={note?.text} onChange={event => {
                            if (note) {
                                setNote({ ...note, text: event.target.value });
                            }
                            setErrorMessage("")

                        }} />

                        <br />
                        <br />
                        <button onClick={saveNote}>Save</button>
                    </> :
                    <>
                        {note?.text}
                        <br />
                        <br />
                        <button onClick={edit}>Edit</button>
                        <button onClick={deleteNote}>Delete</button>
                    </>
                }
            </p>

            <p>
                {errorMessage}
            </p>



        </>
    );
}

export default IdNote;