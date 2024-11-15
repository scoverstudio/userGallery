import React from "react";
import './UserList.scss';

function UserList({onSelectUser}) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    return (
        <div className='user-list'>
            <h2>User List</h2>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <div className='users'>
                    {users.map((user) => (
                        <div className='user-data' key={user.id} onClick={() => onSelectUser(user)}>
                            {user.profilePicture && (
                                <img
                                    src={user.profilePicture}
                                    alt="Profile"
                                    width="50"
                                    style={{borderRadius: "50%"}}
                                />
                            )}
                            <span>Name: {user.name}</span>
                            <span>Birthday: {user.birthday}</span>
                            <span>Email: {user.email}</span>
                            <span>Phone: {user.phone}</span>
                            <span>Address: {user.address}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserList;
