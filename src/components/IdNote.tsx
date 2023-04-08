import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type IdNoteProps = {
    notes: Note[],
    setNotes: (notes: Note[]) => void;
}

function IdNote({notes, setNotes }: IdNoteProps) {
    const { id } = useParams()
    const [note, setNote] = useState<Note>();
    useEffect(() => {
        setNote(notes.find((note) => note._id === id))
    }, [notes.length])
    return ( 
        <>
        <h3>
            {note?.username}
        </h3>

        <p>
            {note?.text}
        </p>
        </>
     );
}

export default IdNote;