import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const value = {
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError
    }

  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
