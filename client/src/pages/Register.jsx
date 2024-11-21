import React, { useState, useEffect } from "react";
import { API_URL } from "../functions/API_URL";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validation = () => {
        if (password !== verifyPassword) {
            return "Verified password does not equal to password";
        }
        if (username.length < 2 || username.length > 15) {
            return "username should be longer than 2 characters and shorter than 15 character";
        }
        if (password.length < 2 || password.length > 15) {
            return "password should be longer than 2 characters and shorter than 15 character";
        }
        return null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = validation();
        if (valid !== null) {
            setError(valid);
        } else {
            try {
                const newUser = {
                    username: username,
                    password: password,
                };

                const postOption = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser),
                };
                const result = await fetch(`${API_URL}/registration`, postOption);
                if (!result.ok) throw await result.text();
                const data = await result.json();
                if (data) {
                    setError(null);
                    navigate(`/${username}`);
                }
            } catch (err) {
                console.log(err);
                setError(err);
            }
        }
    };
    return (
        <form className="login-form" method="POST" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>Username:</label>
            <br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label>Verify Password:</label>
            <br />
            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
            <br />
            <button>Submit</button>
            <br />
            <Link to="/">Login</Link>
            <p>{error}</p>
        </form>
    );
}
