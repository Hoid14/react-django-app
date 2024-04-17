import { createContext, useState} from 'react'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
  const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
  
  
  const navigate = useNavigate()

  const loginUser = async (e) =>{
    e.preventDefault()
    api
    .post("/api/token/", {
      username:e.target.username.value,
      password:e.target.password.value
    })
    .then(response =>{
      localStorage.setItem('authTokens', JSON.stringify(response.data))
      setAuthTokens(response.data)
      setUser(jwtDecode(response.data.access))
      navigate('/')
    })
    .catch(error =>{
      alert(error)
    })
  }

  const logoutUser = () =>{
    
    localStorage.clear()
    setAuthTokens(null)
    setUser(null)
    navigate('/login')
  }
    
    const registerUser = async (e) =>{
      e.preventDefault()
        api
        .post('/api/user/register/',{
          username:e.target.username.value,
          password:e.target.password.value
        })
        .then((response)=>{
          console.log(response)
        })
      .catch((error) => {
        alert(error)
      })
      navigate('/login')
    }

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  }

  


  
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

