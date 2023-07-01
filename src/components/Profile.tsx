import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, login } from "../application-store/userSlice";

type ProfileProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
}

function Profile({ users, setUsers, notes, setNotes }: ProfileProps) {
    const user: User = useSelector((store: any) => store.user.value);
    // const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [editState2, setEditState2] = useState<boolean>(false);
    const [editState3, setEditState3] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.email)
            setEmail(user.email);
    }, [user.email]);

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

    const editEmail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        if (user.email) {
            setEditState2(true);
            
        }
        else {
            setErrorMessage("You do not have an email")

        }
    }

    const saveEmail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // if (user?.email === "") {
        //     setErrorMessage("You do not have an email")

        // }
        // else {
            setEditState2(false);

            axios.put<User>(`http://localhost:5000/users/${user?._id}`, {email}).then(response => {

                if (response.status === 200) {
                    const temp = []
                    for (let i = 0; i < users.length; i++){
                        if(users[i]._id != response.data._id) {
                            temp.push(users[i])
                        }
                        else temp.push(response.data)
                    }
                    dispatch(login(response.data));
                    setUsers(temp)
                }
            })
        // }

    }

    return (<>
        <h3>Username: </h3> {user?.username}
        <h3>Email: </h3>
        <p>
            {editState2 ?
                <>
                    <input type="text" value={email} onChange={event => {
                        // if (user?.email) {
                            setEmail(event.target.value);
                        // }
                        setErrorMessage("");

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