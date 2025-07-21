import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Component for handling user logout functionality
const UserLogout = () => {
  // Get authentication token from localStorage
  const token = localStorage.getItem("token");
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to handle logout process when component mounts
  useEffect(() => {
    // Make API call to logout endpoint
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        // Clear token from localStorage on successful logout
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/login")
      }
    }).catch((error) => {
      // Handle any errors during logout
      console.error("Logout failed:", error);
      navigate("/login");
    });
  }, []); // Empty dependency array ensures this runs once on mount

  // Render loading message while logout is processing
  return (
    <div>Logging out...</div>
  )
}

export default UserLogout