import React, {useState} from "react";
import './UserForm.scss';

function UserForm() {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = {
            id: Date.now(),
            name,
            birthday,
            email,
            phone,
            address,
            profilePicture,
            photos: [],
        };

        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        alert("User added!");
        setName("");
        setBirthday("");
        setEmail("");
        setPhone("");
        setAddress("");
        setProfilePicture("");
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                <div className='form-group'>
                    <label>Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Birthday:</label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Address:</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Profile Picture URL:</label>
                    <input
                        type="url"
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                    />
                </div>
                <button className='submit-btn' type="submit">Add User</button>
            </form>
        </div>
    );
}

export default UserForm;
