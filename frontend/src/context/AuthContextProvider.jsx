import { createContext, useState} from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [authTokens, setAuthTokens] = useState(null)

  const loginUser = async (e) =>{
    e.preventDefault()
  }

  const logoutUser = (e) =>{
    e.preventDefault()
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

