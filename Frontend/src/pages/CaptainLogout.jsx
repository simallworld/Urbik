import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CaptainLogout = () => {
    // Get navigation function for redirection
    const navigate = useNavigate();

    // Get captain's token from localStorage
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Send logout request to invalidate the token on server
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                // On successful logout, remove token and redirect
                localStorage.removeItem("token");
                navigate("/captain-login")
            }
        }).catch(() => {
            // Handle any errors during logout
            console.error("Logout failed:", error);
            // If logout fails, still remove token and redirect
            localStorage.removeItem("token");
            navigate("/captain-login");
        });
    }, []); // Dependencies for useEffect

    // Show simple message while logout is processing
    return (
        <div>Logging out...</div>
    )
}

export default CaptainLogout;