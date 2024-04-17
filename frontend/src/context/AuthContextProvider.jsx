import { createContext, useEffect, useState} from 'react'
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
        .then(()=>{
          navigate('/login')
        })
      .catch(() => {
        alert('Failed to register. Please try again.')
      })
      
    }

    const updateToken = async () =>{
      api
      .post('/api/token/refresh/',{
        refresh: authTokens.refresh
      })
      .then(response =>{
        if(response.status === 200){
          localStorage.setItem('authTokens', JSON.stringify(response.data))
          setAuthTokens(response.data)
          setUser(jwtDecode(response.data.access))
        }
        else{
          logoutUser()
        }
        
      })
    }

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  }

  useEffect(()=>{
    

    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    const interval = setInterval(()=>{
        if(authTokens){
            updateToken()
        }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)

},[authTokens])

  


  
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

