import React from 'react'
import { MapPin }  from 'lucide-react'

const LocationSearchPanel = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-2">
        <MapPin className='p-1 rounded-3xl bg-[#f8fafc] border border-gray-300 ' />
        <h4 className='text-lg font-semibold' >Mumbai , Maharashtra , India</h4>
      </div>
      
      <div className="flex items-center justify-start gap-2">
        <MapPin className='p-1 rounded-3xl bg-[#f8fafc] border border-gray-300 ' />
          <h4 className='text-lg font-semibold' >Mumbai , Maharashtra , India</h4>
      </div>
      
      <div className="flex items-center justify-start gap-2">
        <MapPin className='p-1 rounded-3xl bg-[#f8fafc] border border-gray-300 ' />
          <h4 className='text-lg font-semibold' >Mumbai , Maharashtra , India</h4>
      </div>
      
      <div className="flex items-center justify-start gap-2">
        <MapPin className='p-1 rounded-3xl bg-[#f8fafc] border border-gray-300 ' />
          <h4 className='text-lg font-semibold' >Mumbai , Maharashtra , India</h4>
      </div>
    
    </div>
  )
}

export default LocationSearchPanel