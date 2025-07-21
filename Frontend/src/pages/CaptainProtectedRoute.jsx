// Import necessary dependencies from React and other libraries
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Protected route component that ensures only authenticated captains can access certain routes
const CaptainProtectedRoute = ({ children }) => {
    // Get authentication token from localStorage
    const token = localStorage.getItem('token')
    // Hook for programmatic navigation
    const navigate = useNavigate()
    // Access captain context for state management
    const { captain, setCaptain } = useContext(CaptainDataContext)
    // Loading state to handle API request lifecycle
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // If no token exists, redirect to login page
        if (!token) {
            navigate('/captain-login')
            return // Add early return to prevent unnecessary API call
        }

        // Fetch captain's profile data to verify authentication
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                // Update captain context with profile data
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {
                // Clear token and redirect to login if authentication fails
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [token, navigate, setCaptain]) // Add missing dependencies to useEffect

    // Show loading state while verifying authentication
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // Render protected content once authenticated
    return (<>{children}</>)
}

export default CaptainProtectedRoute