import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FolderUrlProvider } from './contexts/FolderUrContext';

import './App.css'
import Login from './pages/Login'
import Home from './pages/Home';
import SpecificFile from './pages/SpecificFile';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [folderUrl, setFolderUrl] = useState('/')


  return (
    <>
      <FolderUrlProvider>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path=':username' element={<Home setFolderUrl={setFolderUrl} folderUrl={folderUrl} />} />
              <Route path=':username/:fileName' element={<SpecificFile folderUrl={folderUrl} />} />
            </Route>
          </Routes>
        </Router>
      </FolderUrlProvider>
    </>
  )
}

export default App
