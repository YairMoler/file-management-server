import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { fetchData } from "../functions/fetchdata";

export default function Login({setCurrentUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const userId = useParams();
    const navigate = useNavigate();

    

    async function handleSubmit(e) {
        e.preventDefault();
        const user = { username: username, password: password };
        const result = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": 'http://localhost:5173'

            },
            body: JSON.stringify(user),
        })
        console.log(result.status)
        if(result.status === 400){
            setError("this user does not exist");
        }
        else if(result.status === 404){
            setError("something went wrong");
        }
        else{
            setError(null)
            setCurrentUser(user);
            navigate(`/${user.username}`);
        }


    }

    //   function checkUserData() {
    //     const currentUser = usersData.filter(
    //       (user) => user.username === username && user.website === password
    //     )[0];
    //     localStorage.setItem(
    //       "currentUserId",
    //       JSON.stringify(currentUser?.id) || null
    //     );
    //     return currentUser;
    //   }

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, '', window.location.href);
        };
    }, []);

    return (
        <form method="POST" action="/login" className="login-form" onSubmit={handleSubmit}>
            <h1 className="inside-form">Login</h1>
            <label className="inside-form">Username:</label>
            <input
                className="inside-form"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="inside-form">Password:</label>
            <input
                className="inside-form"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="inside-form">Submit</button>
            <br />
            <Link className="inside-form" to="/register">
                Sign Up
            </Link>
            <p className="inside-form">{error}</p>
        </form>
    );
}
