import React, { createContext, useEffect, useState } from 'react'

interface AuthContextProps {
   authenticatedUser: any
   setAuthenticatedUser: (user: any) => void
}

export const AuthContext = createContext<AuthContextProps>({
   authenticatedUser: null,
   setAuthenticatedUser: () => {}
})

export const AuthProvider: React.FC<{children: React.ReactNode }> = ({children}) => {
   const [authenticatedUser, setAuthenticatedUser] = useState<any>(null)

   useEffect(() => {
      const storedUser = localStorage.getItem('authenticated')
      if(storedUser) {
         setAuthenticatedUser(storedUser)
      }
   }, [])

   return (
      <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
         {children}
      </AuthContext.Provider>
   )
}