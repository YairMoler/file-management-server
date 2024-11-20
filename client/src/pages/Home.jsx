import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../functions/API_URL";
export default function Home({ currentUser }) {
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    useEffect(() => {
        try {
            const response = (async () => await fetch(`${API_URL}/users/${currentUser.username}`))();
            if (!response.ok) throw Error("Did not receive expected data");
            const data = (async () => await response.json());
            if (data.length === 0) setError(`You have no files`);
            else {
                setFiles(data);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }

    }, []);
    return (
        <div>
            {files.map((file) => {
                <div>{file}</div>
            })}
        </div>
    )
}
