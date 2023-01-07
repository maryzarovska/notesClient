import React, { useState } from 'react';

type UsersProps = {
    users: User[];
    setUsers: (users: User[]) => void;
}

function Users({ users, setUsers }: UsersProps) {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);

    const addUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!name) {
            alert('Name is required');
            return;
        }
        setUsers([...users, { id: users.length + 1, name, age }]);
    };

    return (
        <>
            <p>
                <input className='input1' type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <input className='input1' type="number" value={age} onChange={(event) => setAge(parseInt(event.target.value))} />
                <button className='button2' onClick={addUser}>Add</button>
            </p>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </>
    );
}

export default Users;
