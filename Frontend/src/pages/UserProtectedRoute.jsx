import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from "react-router-dom"

// Component to protect routes that require user authentication
const UserProtectedRoute = ({ children }) => {
    // Get authentication token from localStorage
    const token = localStorage.getItem('token')
    // Hook for programmatic navigation
    const navigate = useNavigate()

    // Check for authentication on component mount and token changes
    useEffect(() => {
        if (!token) {
            // Redirect to user login if no token is found
            navigate("/user-login")
        }
    }, [token, navigate])

    // Render child components if authenticated
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedRoute