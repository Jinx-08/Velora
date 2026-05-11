import React from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()

const Usercontext = ({ children }) => {

    const [user, setuser] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '' 
    })

  return (
    <div>
        <UserContext.Provider value={[user, setuser]}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default Usercontext