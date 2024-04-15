import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const PrivateRoute = ({children, ...rest}) => {
    const { user } = useContext(AuthContext)

    return !user ? <Navigate to='/login'/> : children
}
