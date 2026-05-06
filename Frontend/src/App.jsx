import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/user-login" element={ <Userlogin /> } />
        <Route path="/user-signup" element={ <Usersignup /> } />
        <Route path="/captain-login" element={ <Captainlogin /> } />
        <Route path="/captain-signup" element={ <Captainsignup /> } />
      </Routes>
    </div>
  )
}

export default App