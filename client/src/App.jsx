import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Landing from './Pages/Landing'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { Feed } from './Pages/Feed'
import CreatePost from './Pages/CreatePost'
import EditProfile from './Pages/EditProfile'

function App() {
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default right-click behavior
  };
    return (
    <BrowserRouter>
    <div onContextMenu={handleContextMenu}>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/feed' element={<Feed />}/>
      <Route path='/create' element={<CreatePost />}/>
      <Route path='/editprofile' element={<EditProfile />}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
