import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { Form } from "../components/Form"

export const RegisterPage = () => {
    const { registerUser, loading } = useContext(AuthContext)
    
    return (
        <Form name="Register" handleSubmit={registerUser} loading={loading}/>
    )
}