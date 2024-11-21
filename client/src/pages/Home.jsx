import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import File from "../components/File";
import { API_URL } from "../functions/API_URL";
import Folder from "../components/Folder";
import { FolderUrlContext } from "../contexts/FolderUrContext";
export default function Home() {
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [newFileName, setNewFileName] = useState('');
    const [isFileAdd, setIsFileAdd] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isFolderAdd, setIsFolderAdd] = useState(false);
    const { username } = useParams();
    const { folderUrl, setFolderUrl } = useContext(FolderUrlContext)

    useEffect(() => {
        (async () => await getFiles())()

    }, []);
    const getFiles = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${username}`);
            console.log(response)
            if (!response.ok) throw Error("Did not receive expected data");
            const data = await response.json();
            if (data.length === 0) setError(`You have no files`);
            else {
                setFiles(data);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
    }
    const showFolderContent = async (folder) => {
        try {
            const response = await fetch(`${API_URL}/users/${username}${folderUrl}/${folder.name}`);
            console.log(response)
            if (!response.ok) throw Error("Did not receive expected data");
            const data = await response.json();
            console.log(data)
            if (data.length === 0) {
                setError('this folder is empty');
            }
            else {
                setFolderUrl(prev => {
                    if (prev === '/')
                        return prev + `${folder.name}`
                    else
                        return prev + `/${folder.name}`
                })
                setFiles(data)
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
    }
    const saveChanges = async (file, updatedName, setIsEdit) => {
        try {
            let url = '';
            if (folderUrl === '/')
                url = `${API_URL}/users/${username}/${file.name}`;
            else {
                url = `${API_URL}/users/${username}${folderUrl}/${file.name}`;
            }
            const updatedFile = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedName,
                }),
            };
            const response = await fetch(url, updatedFile)
            if (!response.ok) throw Error("Did not receive expected data");
            const data = await response.text();
            const fileIndex = files.findIndex(item => item.name === file.name);
            const newFiles = files;
            newFiles[fileIndex].name = updatedName;
            setFiles(newFiles)
            setIsEdit(false);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }
    const deleteFile = async (file) => {
        try {
            const deleteOption = {
                method: "DELETE",
            };
            let url = '';
            if (folderUrl === '/')
                url = `${API_URL}/users/${username}/${file.name}`;
            else {
                url = `${API_URL}/users/${username}${folderUrl}/${file.name}`;
            }
            const response = await fetch(url, deleteOption);
            console.log('response: ', response);

            if (!response.ok) throw Error("Did not receive expected data");

            const newList = files.filter((item) => item.name !== file.name);
            setFiles(newList);
            setError(null);
        }
        catch (err) {
            console.log('err: ', err);
            setError(err);
        }

    }

    const postFileRequest = async (e, type) => {
        try {
            e.preventDefault();
            let fileToPost = '';
            if (type === "folder") {
                fileToPost = newFolderName;
            }
            else {
                fileToPost = newFileName;
            }
            const newFile = {
                name: fileToPost,
                type: type
            }
            const postOption = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFile),
            };
            let url = '';
            if (folderUrl === '/')
                url = `${API_URL}/users/${username}/`;
            else {
                url = `${API_URL}/users/${username}${folderUrl}`;
            }
            console.log("hello")
            const response = await fetch(url, postOption);
            console.log('response: ', response);

            if (!response.ok) throw Error("Did not receive expected data");
            const newList = files;
            console.log(newList);
            newList.push(newFile);
            console.log('newList: ', newList);
            setError(null)
            setFiles(newList);
            setIsFileAdd(false)
            setIsFolderAdd(false)
            setNewFileName("");
            setNewFolderName("")

        } catch (err) {
            setError(err.errMsg);
        }

    }
    return (
        <main>
            <header>
                <button onClick={() => setIsFileAdd(prev => !prev)}>add file</button>
                <button onClick={() => setIsFolderAdd(prev => !prev)}>add folder</button>
            </header>

            {isFileAdd &&
                <form method="POST" onSubmit={(e) => postFileRequest(e, "file")}>
                    <input placeholder="file name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
                    <button onClick={(e) => postFileRequest(e, "file")}>save</button>
                </form>
            }
            {isFolderAdd &&
                <form method="POST" onSubmit={(e) => postFileRequest(e, "folder")}>
                    <input placeholder="folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
                    <button onClick={(e) => postFileRequest(e, "folder")}>save</button>
                </form>
            }
            <div className="files-container">
                {files.map((file, index) => {
                    return (file.type === 'folder' ?
                        <Folder key={`${file.name}.${index}`} folder={file} showFolderContent={showFolderContent} deleteFolder={deleteFile} saveChanges={saveChanges} /> :
                        <File key={`${file.name}.${index}`} file={file} deleteFile={deleteFile} saveChanges={saveChanges} />)
                })}
                <p>{error}</p>
            </div>
        </main>
    )
}
