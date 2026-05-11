import React from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '' 
    })

  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default UserProvider