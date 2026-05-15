import React from 'react'
import { MapPin }  from 'lucide-react'

const LocationSearchPanel = ({ suggestions = [], setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    // Default suggestions if none are provided
    const displaySuggestions = suggestions.length > 0 ? suggestions : [
        "Mumbai, Maharashtra, India",
        "Pune, Maharashtra, India",
        "Delhi, India",
        "Bangalore, Karnataka, India"
    ];

  return (
    <div className="flex flex-col gap-4">
      {displaySuggestions.map((suggestion, index) => (
        <div 
          key={index} 
          onClick={() => handleSuggestionClick(suggestion)}
          className="flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-xl"
        >
          <MapPin className='p-1 rounded-3xl bg-[#f8fafc] border border-gray-300' />
          <h4 className='text-lg font-semibold'>{suggestion}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel