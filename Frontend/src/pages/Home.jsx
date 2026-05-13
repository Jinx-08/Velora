import React from 'react'
import logo from '../assets/gemini-svg.svg'
import { useState, useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { ArrowDownToLine } from 'lucide-react'
import LocationSearchPanel from '../Components/LocationSearchPanel'

const Home = () => {

  const [pickup, setpickup] = useState('')
  const [dropoff, setdropoff] = useState('')
  const [panelopen, setpanelopen] = useState(false)
  const panelRef = useRef(null)

  const submithandle = (e) => {
    e.preventDefault()
  }


  useGSAP(() => {
    if (panelopen) {
      gsap.to(panelRef.current, {
        height: '100%',
        duration: 0.5,
        ease: 'power2.inOut',
        padding: '20px'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        padding: '0px'
      })
    }
  }, [panelopen])


  return (
    <div className=' h-screen relative ' >

      <img className='w-36 absolute left-5 top-5  '  src={logo} alt="Logo" />

      <div className=' h-screen w-screen ' >
        {/* temporary image */}
        <img className=' h-full w-full object-cover ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full ' >
        
        <div className='h-[30%] p-5 bg-white relative'>
            <h5 className='p-1 absolute top-6 right-5 cursor-pointer' onClick={() => setpanelopen(false)}>
              <ArrowDownToLine size={20} />
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form className='relative flex flex-col gap-3 mt-4' onSubmit={(e)=>{
              submithandle(e)
            }}>
              <div className="line absolute h-14 w-1 top-[20%] left-8 bg-gray-700 rounded-full"></div>
              <input 
                className=' bg-[#eee] px-12 py-2 text-base rounded-lg w-full' 
                type="text" 
                placeholder="Add a pickup location" 
                onClick={()=> setpanelopen(true)}
                value={pickup} 
                onChange={(e) => setpickup(e.target.value)} 
              />
              <input 
                className=' bg-[#eee] px-12 py-2 text-base rounded-lg w-full' 
                type="text" 
                placeholder="Add a dropoff location" 
                onClick={()=> setpanelopen(true)}
                value={dropoff} 
                onChange={(e) => setdropoff(e.target.value)} 
              />
            </form>
        </div>

        <div ref={panelRef} className=' h-0 bg-white   ' >

              <LocationSearchPanel />
        </div>


      </div>


    </div>
    

  )
}

export default Home