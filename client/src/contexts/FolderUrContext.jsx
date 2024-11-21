import { useState } from "react";
import { createContext } from "react";


// 1: 👇create the Context
export const FolderUrlContext = createContext();
// 2: 👇create the Provider Component 

export const FolderUrlProvider = ({children}) => {
    const [folderUrl, setFolderUrl] = useState('/');
    return (
        <FolderUrlContext.Provider value={{folderUrl: folderUrl, setFolderUrl: setFolderUrl}}>
            {children}
        </FolderUrlContext.Provider>
    )
} 