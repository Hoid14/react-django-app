import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { Form } from "../components/Form"

export const LoginPage = () => {
    const { loginUser, loading, logoutUser } = useContext(AuthContext)
    
    useEffect(()=>{
        logoutUser()
    },[])

    return (
        <Form name="Login" handleSubmit={loginUser} loading={loading}/>
    )
}
