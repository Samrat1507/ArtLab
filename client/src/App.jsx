import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Landing from './Pages/Landing'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { Feed } from './Pages/Feed'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/feed' element={<Feed />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
