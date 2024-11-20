import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import Login from './pages/Login'
import Home from './pages/Home';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Login setCurrentUser={setCurrentUser}/>} />
            <Route path=':username' element={<Home currentUser={currentUser}/>}/>
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
