import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Userprotectwrapper from './pages/Userprotectwrapper'
import Home from './pages/Home'
import { User } from 'lucide-react'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Start /> } />
        <Route path="/user-login" element={ <Userlogin /> } />
        <Route path="/user-signup" element={ <Usersignup /> } />
        <Route path="/captain-login" element={ <Captainlogin /> } />
        <Route path="/captain-signup" element={ <Captainsignup /> } />
        <Route path="/home" element={ 
          <Userprotectwrapper>
            <Home />
          </Userprotectwrapper>
        } />
      </Routes>
    </div>
  )
}

export default App