import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'
import "../styles/header.css"

export const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    
    return (
        <div className='header-container'>
            
            {user ? (
                <div className='button-logout-username'>
                    <h1 className="username">Hello {user.username}!</h1>
                    <button className='button-logout'><Link className='button-link-text'><span onClick={logoutUser}>Logout</span></Link></button>
                </div>
                
            ) : (
                <div className='button-container'>
                    <button className='button-login-register'><Link className='button-link-text' to="/login" >Login</Link></button>
                    <button className='button-login-register'><Link className='button-link-text' to="/register" >Register</Link></button>
                    
                </div>
                
            )}
            
        </div>
    )
}
