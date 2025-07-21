// Import necessary dependencies
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from "axios";

const UserLogin = () => {
  // State for form inputs and user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get user context and navigation function
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  // Handle input changes for email and password fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
  }

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    // Send login request to backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        // Update user context with logged in user data
        setUser(data.user)
        // Store authentication token
        localStorage.setItem("token", data.token)
        // Redirect to home page after successful login
        navigate('/home')
      }
    } catch (error) {
      // Update error message to reflect login failure instead of registration
      console.error("Login failed:", error.response?.data || error.message);
    }

    // Clear form fields after submission
    setEmail('')
    setPassword('')
  }

  return (
    <>
      {/* Login form container */}
      <form onSubmit={submitHandler}>
        {/* Main container with responsive styling */}
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 mt-14 md:flex md:flex-col md:mt-14 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          {/* App logo/title */}
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>

          {/* Email input field */}
          <div className='flex flex-col rounded px-3 mt-15 md:mt-10 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>What's your email</h3>
            <input
              className='bg-gray-200 md:text-xl p-2 md:p-2 rounded'
              required
              type="email"
              placeholder='Your email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>

          {/* Password input field */}
          <div className='flex flex-col rounded px-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter password</h3>
            <input
              className='bg-gray-200 md:mb-6 p-2 md:text-xl md:p-2 rounded'
              required
              type="password"
              placeholder='Your password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>

          {/* Login button with hover animation */}
          <Link
            to=""
            onClick={submitHandler}
            className="group relative z-0 h-10 overflow-hidden overflow-x-hidden rounded-md flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-2 md:h-12 md:justify-center md:w-120 md:mx-auto md:py-3 md:mt-4"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-blue-400 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </Link>

          {/* Sign up link */}
          <p className='text-center text-sm md:text-lg'>
            New here? <Link to="/signup" className='text-blue-500 font-bold'>Create new Account</Link>
          </p>

          {/* Captain login option */}
          <Link
            to="/captain-login"
            className='flex item-center justify-center cursor-pointer mt-15 px-2 w-84 m-3 mx-auto bg-green-500 hover:bg-green-600 transition-ease-in-out duration-200 text-white py-2 rounded md:justify-center md:w-120 md:mx-auto md:py-3 md:mt-15 md:my-15'
          >
            Sign in as Captain
          </Link>
        </div>
      </form>
    </>
  )
}

export default UserLogin