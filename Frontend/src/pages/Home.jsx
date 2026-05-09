import React from 'react'
import logo from '../assets/gemini-svg.svg'
import { Link } from 'react-router-dom'
import Userlogin from './Userlogin'
import { ArrowRightToLine } from 'lucide-react';

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1538563188159-070c4db2bc65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)]  h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
            <img className='w-28 ml-8' src={logo} alt="Logo" />
            <div className='bg-white pb-8 py-4 px-4 '>
                <h2 className='text-3xl font-bold' > Get Started With Velora </h2>
                <Link to='/user-login' className='bg-black text-white w-full flex items-center justify-center py-3 rounded mt-5' >
                    Continue
                    <ArrowRightToLine className='ml-2' />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home