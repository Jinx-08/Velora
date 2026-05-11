import React from 'react'
import { useState } from 'react'

export const CaptainContext = React.createContext()

const CaptainProvider = ({ children }) => {

		const [captain, setCaptain] = useState({
				FirstName: '',
				LastName: '',
				Email: '',
				Password: ''
		})

	return (
		<div>
				<CaptainContext.Provider value={{ captain, setCaptain }}>
						{children}
				</CaptainContext.Provider>
		</div>
	)
}

export default CaptainProvider
