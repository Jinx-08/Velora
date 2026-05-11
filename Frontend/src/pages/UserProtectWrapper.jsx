import React  from 'react'
import { UserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Userprotectwrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const { user } = React.useContext(UserContext)
  const navigate = useNavigate()
  const [isloading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    if (!token) {
      navigate('/user-login')
    }
  }, [token, navigate])

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
    setIsloading(false)
    navigate('/user-login')
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

export default Userprotectwrapper