import React, { useEffect, useState } from 'react'
import { UserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Userprotectwrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const { user, setUser } = React.useContext(UserContext)
  const navigate = useNavigate()
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/user-login')
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUser(response.data)
      setIsloading(false)
    })
    .catch(error => {
      console.error('Error fetching user profile:', error)
      localStorage.removeItem('token')
      navigate('/user-login')
    })
  }, [token, navigate, setUser])

  if (isloading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Userprotectwrapper