import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../functions/API_URL";
import { FolderUrlContext } from "../contexts/FolderUrContext";

export default function SpecificFile() {
    const [error, setError] = useState(null);
    const { username, fileName } = useParams();
    const [content, setContent] = useState('');
    const {folderUrl, setFolderUrl} = useContext(FolderUrlContext)
    

    useEffect(() => {
        getFileContent()
    })
    const getFileContent = async () => {
        try {
            let url = '';
            if(folderUrl === '/')
                url = `${API_URL}/users/${username}/${fileName}`;
            else{
                url = `${API_URL}/users/${username}${folderUrl}/${fileName}`;
            }
            const response =  await fetch(url)
            if (!response.ok) throw Error("Did not receive expected data");
            const data =  await response.text();
            if(data === null) setError('this file is empty')
            setContent(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div>
            <p>{content}</p>
            <p>{error}</p>
        </div>
    )
}
