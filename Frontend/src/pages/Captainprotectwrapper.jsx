import React, { useState } from 'react'
import { CaptainContext } from '../context/Captaincontext'
import { useNavigate } from 'react-router-dom'

const Captainprotectwrapper = ({ children }) => {
  const token = localStorage.getItem('captainToken')
  const { captain } = React.useContext(CaptainContext)
  const navigate = useNavigate()
  const [isloading, setIsloading] = useState(true)

  React.useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }
  }, [token, navigate])

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    setCaptain(response.data)   
    setIsloading(false)
  })
  .catch(error => {
    console.error('Error fetching captain profile:', error)
    setIsloading(false)
    navigate('/captain-login')
  })

  if (isloading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Captainprotectwrapper
