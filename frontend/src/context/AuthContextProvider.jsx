import { createContext, useEffect, useState} from 'react'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
  const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()

  const loginUser = async (e) =>{
    e.preventDefault()
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();

        if(data){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/')
        } else {
            alert('Something went wrong while loggin in the user!')
        }
  }

  const logoutUser = (e) =>{
    e.preventDefault()
    localStorage.clear()
    setAuthTokens(null)
    setUser(null)
    navigate('/login')
  }

  const updateToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({refresh:authTokens?.refresh})
    })

    const data = await response.json()
    if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
    } else {
        logoutUser()
    }
    if(loading){
        setLoading(false)
    }
    } 

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(()=>{
      if(loading){
        updateToken()
      }
      const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
      let interval = setInterval(()=>{
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

