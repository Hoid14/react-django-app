import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { Form } from "../components/Form"

export const LoginPage = () => {
    const { loginUser, loading } = useContext(AuthContext)
    

    return (
        <Form name="Login" handleSubmit={loginUser} loading={loading}/>
    )
}
