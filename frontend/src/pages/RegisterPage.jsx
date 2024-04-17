import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

export const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext)
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}