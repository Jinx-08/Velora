import React from 'react'
import logo from '../assets/gemini-svg.svg'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/Usercontext'

const Usersignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userDate, setuserDate] = useState({})

  const navigate = useNavigate()

  const {user , setUser} = React.useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      name:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201){
      const data = (response.data)
      localStorage.setItem('token', data.token)
      setUser(data.user)
      navigate('/home')
    }

    setemail('')
    setpassword('')
    setfirstName('')
    setlastName('')
   
  }
  return (
     <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center p-4'>
      <div className='w-full max-w-md pb-1 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 flex flex-col justify-between min-h-150 border border-gray-100'>
        
        <div>
          <img className='w-36 mb-5' src={logo} alt="Logo" />
          
          <form className='flex flex-col' onSubmit={handleSubmit} >

              <h3 className='text-lg mb-2 font-medium text-gray-800'>What's your name?</h3>
              <div className='flex mb-6'  >
                <input className='bg-[#f3f4f6] w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black  text-base placeholder:text-gray-400 transition-all' 
                 value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                 required type="text" placeholder='First Name' />

                <input className='bg-[#f3f4f6] ml-4 w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black text-base placeholder:text-gray-400 transition-all' 
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                 required type="text" placeholder='Last Name' />


              </div>
                

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
              
              <button type='submit' className='bg-black font-semibold text-white mb-5 py-3 px-4 rounded-xl w-full text-lg hover:bg-gray-800 transition-colors shadow-md'>Create account</button>

              <p className='text-center text-sm text-gray-600'>
                Already have an account? <Link to='/user-login' className='text-blue-600 font-medium hover:underline ml-1'>Login here</Link>
              </p>
          </form>
        </div>

        <div className='mt-10'>
          <p className='text-center text-sm text-gray-600'>
            By signing up, you agree to our <Link  className='text-blue-600 font-medium hover:underline'>Terms of Service</Link> and <Link to='/privacy' className='text-blue-600 font-medium hover:underline'>Privacy Policy</Link>.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Usersignup 