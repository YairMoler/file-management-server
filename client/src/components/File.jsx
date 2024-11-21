import React, { useState, useContext } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { FolderUrlContext } from "../contexts/FolderUrContext";
import { API_URL } from '../functions/API_URL';

export default function File({file, deleteFile, saveChanges}) {
    const navigate = useNavigate();
    const { username } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(null);
    const [updatedName, setUpdatedName] = useState(file.name);
    const {folderUrl, setFolderUrl} = useContext(FolderUrlContext)


    const showFileContent = () => {
        console.log("asd")
        if(folderUrl === '/')
            navigate(`/${username}/${file.name}`);
        else{
            navigate(`/${username}/${file.name}`);
        }
    }
    const renameFile = () => {
        setIsEdit(true);
    }
    
    return (
        <div className="file-div" key={file.name}>
            {isEdit ? <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/> :
            <h1>{updatedName}</h1>
            }
            <div className="actions-buttons">
                <button onClick={showFileContent}>show</button>
                {isEdit ? <button onClick={() => saveChanges(file, updatedName, setIsEdit)}>save</button> : 
                <button onClick={renameFile}>rename</button>}
                <button onClick={() => deleteFile(file)}>delete</button>
            </div>
            <p>{error}</p>
        </div>
    )
}
