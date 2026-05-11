import React  from 'react'
import { UserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Userprotectwrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const { user } = React.useContext(UserContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!token) {
      navigate('/user-login')
    }
  }, [token, navigate])

  return (
    <div>
      {children}
    </div>
  )
}

export default Userprotectwrapper