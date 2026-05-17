import React from 'react'
import logo from '../assets/velora-logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'


const Userlogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [userDate, setuserDate] = useState({})

  const {user , setUser} = React.useContext(UserContext)

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setuserDate({ Email: email, Password: password })

    const userData = {  
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if(response.status === 200){
        const data = response.data
        localStorage.setItem('token', data.token)
        setUser(data.user)
        navigate('/home')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again or create a new account.");
      } else {
        alert("An error occurred during login.");
      }
    }

    setemail('')
    setpassword('')
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 flex flex-col justify-between min-h-150 border border-gray-100'>
        
        <div>
          <img className='w-36 mb-10' src={logo} alt="Logo" />
          
          <form className='flex flex-col' onSubmit={e => handleSubmit(e)}>
              <h3 className='text-lg mb-2 font-medium text-gray-800'>What's your email?</h3>
              <input className='bg-[#f3f4f6] mb-6 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black w-full text-base placeholder:text-gray-400 transition-all' 
                 value={email}
                 onChange={(e) => setemail(e.target.value)}

                 required type="email" placeholder='email@example.com' />

              <h3 className='text-lg mb-2 font-medium text-gray-800'>Enter Password</h3>
              <input className='bg-[#f3f4f6] mb-8 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black w-full text-base placeholder:text-gray-400 transition-all' 
                 value={password}
                 onChange={(e) => setpassword(e.target.value)}
                 required type="password" placeholder='password' />
              
              <button type='submit' className='bg-black font-semibold text-white mb-5 py-3 px-4 rounded-xl w-full text-lg hover:bg-gray-800 transition-colors shadow-md'>Login</button>

              <p className='text-center text-sm text-gray-600'>
                New Here? <Link to='/user-signup' className='text-blue-600 font-medium hover:underline ml-1'>Create an Account</Link>
              </p>
          </form>
        </div>

        <div className='mt-10'>
          <Link to='/captain-login' className=' flex items-center justify-center bg-[#10b461] hover:bg-[#0e9952] transition-colors font-semibold text-white py-3 px-4 rounded-xl w-full text-lg shadow-md'>
            Sign in as Captain
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Userlogin