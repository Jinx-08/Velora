import React from 'react'
import logo from '../assets/velora-driver.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainContext } from '../context/Captaincontext'

const Captainsignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [vehicleColor, setvehicleColor] = useState('')
  const [vehiclePlate, setvehiclePlate] = useState('')
  const [vehicleCapacity, setvehicleCapacity] = useState('')
  const [vehicleType, setvehicleType] = useState('')
  const [userDate, setuserDate] = useState({})

  const capacityOptionsByType = {
    car: ['4'],
    auto: ['3'],
    bike: ['1']
  }

  const capacityOptions = capacityOptionsByType[vehicleType] || []

  const { setCaptain } = React.useContext(CaptainContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newCaptain = {
      name: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicles: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicletype: vehicleType
      }
    }

    setuserDate({ FirstName: firstName, LastName: lastName, Email: email, Password: password })

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

      if (response.status === 201) {
        const data = response.data
        localStorage.setItem('captainToken', data.token)
        setCaptain(data.captain)
        navigate('/captain-home')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Please check your details and try again.')
      } else {
        alert('An error occurred during registration.')
      }
    }

    setemail('')
    setpassword('')
    setfirstName('')
    setlastName('')
    setvehicleColor('')
    setvehiclePlate('')
    setvehicleCapacity('')
    setvehicleType('')
  }
  return (
     <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center p-4'>
      <div className='w-full max-w-md pb-1 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 flex flex-col justify-between min-h-150 border border-gray-100'>
        
        <div>
          <img className='w-40 mb-8' src={logo} alt="Logo" />
          
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
              
              <h3 className='text-lg mb-2 font-medium text-gray-800'>Vehicle details</h3>
              <div className='flex mb-6'>
                <input className='bg-[#f3f4f6] w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black text-base placeholder:text-gray-400 transition-all'
                  value={vehicleColor}
                  onChange={(e) => setvehicleColor(e.target.value)}
                  required type='text' placeholder='Color' />

                <input className='bg-[#f3f4f6] ml-4 w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black text-base placeholder:text-gray-400 transition-all'
                  value={vehiclePlate}
                  onChange={(e) => setvehiclePlate(e.target.value)}
                  required type='text' placeholder='Plate' />
              </div>

              <div className='flex mb-8'>
                <select
                  className='bg-[#f3f4f6] w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black text-base text-gray-800 transition-all'
                  value={vehicleCapacity}
                  onChange={(e) => setvehicleCapacity(e.target.value)}
                  required
                >
                  <option value='' disabled>Capacity</option>
                  {capacityOptions.map((capacity) => (
                    <option key={capacity} value={capacity}>{capacity}</option>
                  ))}
                </select>

                <select
                  className='bg-[#f3f4f6] ml-4 w-1/2 rounded-xl px-4 py-3 outline-none border focus:border-black focus:ring-1 focus:ring-black text-base text-gray-800 transition-all'
                  value={vehicleType}
                  onChange={(e) => {
                    setvehicleType(e.target.value)
                    setvehicleCapacity('')
                  }}
                  required
                >
                  <option value='' disabled>Vehicle type</option>
                  <option value='car'>Car</option>
                  <option value='auto'>Auto</option>
                  <option value='bike'>Bike</option>
                </select>
              </div>
              
              <button type='submit' className='bg-black font-semibold text-white mb-5 py-3 px-4 rounded-xl w-full text-lg hover:bg-gray-800 transition-colors shadow-md'>Create account</button>

              <p className='text-center text-sm text-gray-600'>
                Already have an account? <Link to='/captain-login' className='text-blue-600 font-medium hover:underline ml-1'>Login here</Link>
              </p>
          </form>
        </div>

        <div className='mt-10'>
          <p className='text-center text-sm text-gray-600'>
            This site is protected by reCAPTCHA and Google's privacy policy
          </p>
        </div>

      </div>
    </div>
  )
}

export default Captainsignup