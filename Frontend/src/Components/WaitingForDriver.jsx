import React from 'react'
import { ChevronDown, MapPin, Navigation, Banknote } from 'lucide-react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer flex justify-center' onClick={() => {
        props.waitingForDriver(false)
      }}><ChevronDown className="text-gray-200" size={32} /></h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain?.fullname?.firstname || 'Driver'}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate || 'MH 04 AB 1234'}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  {props.ride?.otp || '1234'} </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <MapPin size={24} />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup || 'Pickup location'}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <Navigation size={24} />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination || 'Destination location'}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <Banknote size={24} />
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare || '0'} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver