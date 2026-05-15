import React from 'react'
import { MapPin }  from 'lucide-react'

const LocationSearchPanel = () => {
  return (
    <div className="flex items-center justify-start">
      <MapPin className='p-1  ' />
        <h4>Mumbai , Maharashtra , India</h4>
    </div>
  )
}

export default LocationSearchPanel