import React from 'react'


const Userlogin = () => {
  return (
    <div>

       

        <form className='p-7 flex flex-col' >

            <h3 className='text-xl mb-2 font-bold' >What's your email?</h3>
            <input className='bg-[#eeeeee] mb-5 rounded px-3 py-2 border w-full placeholder:text-gray-500 text-black text-base' required type="email" placeholder='email@example.com' />

            <h3 className='text-xl mb-2 font-bold' >What's your password?</h3>
            <input className='bg-[#eeeeee] mb-5 rounded px-3 py-2 border w-full placeholder:text-gray-500 text-black text-base' required type="password" placeholder='••••••••' />
            
            <button type='submit' className='bg-[#1b1b1f] font-semibold text-white py-2 px-4 rounded hover:bg-blue-600'>Login</button>

        </form>


    </div>
  )
}

export default Userlogin