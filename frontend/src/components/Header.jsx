import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

export const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <Link><span onClick={logoutUser}>Logout</span></Link>
            ) : (
                <>
                    <Link to="/login" >Login</Link>
                    <span> | </span>
                    <Link to="/register" >Register</Link>
                </>
                
            )}
            {user && <p>Hello {user.username}!</p>}

        </div>
    )
}
