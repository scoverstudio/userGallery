import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserDashboard from "./components/UserDashboard";
import "./App.scss";

function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <Router>
            <div>
                {!selectedUser ? (
                    <>
                        <nav>
                            <Link to="/">Form</Link>
                            <Link to="/list">List</Link>
                        </nav>
                        <Routes>
                            <Route path="/" element={<UserForm />} />
                            <Route
                                path="/list"
                                element={<UserList onSelectUser={setSelectedUser} />}
                            />
                        </Routes>
                    </>
                ) : (
                    <UserDashboard user={selectedUser} onBack={() => setSelectedUser(null)} />
                )}
            </div>
        </Router>
    );
}

export default App;
