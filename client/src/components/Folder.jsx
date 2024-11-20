import React, { useState, useContext } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { FolderUrlContext } from "../contexts/FolderUrContext";
import { API_URL } from '../functions/API_URL';

export default function Folder({ folder, showFolderContent, saveChanges }) {
    const { username } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(null);
    const [updatedName, setUpdatedName] = useState(folder.name);
    const {folderUrl, setFolderUrl} = useContext(FolderUrlContext)
    const renameFolder = () => {
        setIsEdit(true);
    }
    
    return (
        <div className="folder-div" key={folder.name}>
            {isEdit ? <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/> :
            <h1>{updatedName}</h1>
            }
            <div className="actions-buttons">
                <button onClick={() => showFolderContent(folder)}>show</button>
                {isEdit ? <button onClick={() => saveChanges(folder, updatedName, setIsEdit)}>save</button> : 
                <button onClick={renameFolder}>rename</button>}
                <button>delete</button>
            </div>
            <p>{error}</p>
        </div>
    )
}
