import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../application-store/userSlice";

type ProfileProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
}

function Profile({ users, setUsers, notes, setNotes }: ProfileProps) {
    const user = useSelector((store: any) => store.user.value);
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [editState, setEditState] = useState<boolean>(false);
    const [editState2, setEditState2] = useState<boolean>(false);
    const [editState3, setEditState3] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const predelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditState3(true);
    }

    const deleteProfile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        axios.delete<User>(`http://localhost:5000/users/${user?._id}`).then(response => {
            if (response.status === 200) {
                setUsers(users.filter(u => u._id !== response.data._id));
                setNotes(notes.filter(n => n.username !== response.data.username));
                dispatch(logout());
                navigate("/login");
            }
        })
    }

    const editUsername = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditState(true);
    }

    const editEmail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditState2(true);
    }

    const saveUsername = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        setEditState(false);

        // axios.put<Note | null>(`http://localhost:5000/notes/${note?._id}`, note).then(response => {
        //     if (note) {
        //         const temp = [];
        //         for (let i = 0; i < notes.length; i++) {
        //             if (notes[i]._id !== note._id) {
        //                 temp.push(notes[i]);
        //             }
        //             else temp.push(note)
        //         }
        //         setNotes(temp)
        //     }
        // })

    }

    const saveEmail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (user?.email === "") {
            setErrorMessage("You do not have an email")

        }
        else {
            setEditState2(false);

            // axios.put<Note | null>(`http://localhost:5000/notes/${note?._id}`, note).then(response => {
            //     if (note) {
            //         const temp = [];
            //         for (let i = 0; i < notes.length; i++) {
            //             if (notes[i]._id !== note._id) {
            //                 temp.push(notes[i]);
            //             }
            //             else temp.push(note)
            //         }
            //         setNotes(temp)
            //     }
            // })
        }

    }

    return (<>
        <h3>Username: </h3>
        <p>
            {editState ?
                <>
                    <input type="text" value={user?.username} onChange={event => {
                        if (username) {
                            setUsername({ ...user, username: event.target.value });
                        }
                        setErrorMessage("")

                    }} />

                    <br />
                    <br />
                    <button onClick={saveUsername}>Save</button>
                </> :
                <>
                    {user?.username}
                    <br />
                    <br />
                    <button onClick={editUsername}>Edit</button>
                </>
            }
        </p>
        <h3>Email: </h3>
        <p>
            {editState2 ?
                <>
                    <input type="text" value={user?.email} onChange={event => {
                        if (email) {
                            setEmail({ ...user, email: event.target.value });
                        }
                        setErrorMessage("")

                    }} />

                    <br />
                    <br />
                    <button onClick={saveEmail}>Save</button>
                </> :
                <>
                    {user?.email}
                    <br />
                    <br />
                    <button onClick={editEmail}>Edit</button>
                </>
            }
        </p>

        <p>
            {editState3 ?
                <>
                    <button onClick={deleteProfile}>Yes, delete profile</button>
                </> :
                <>
                    <button onClick={predelete}>Delete profile</button>
                </>
            }
        </p>
    </>);
}

export default Profile;