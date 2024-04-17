import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { LoadingIndicator } from "../components/LoadingIndicator"

export const LoginPage = () => {
    const { loginUser, loading } = useContext(AuthContext)
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
            {loading && <LoadingIndicator />}
        </div>
    )
}
