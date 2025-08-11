// Import necessary dependencies from React and other libraries
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from "axios";

// CaptainLogin Component - Handles the login functionality for captains
const CaptainLogin = () => {
  // State management for form inputs and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // NEW: Error message state

  const { captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate();

  /**
   * Handles input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
  }

  /**
   * Handles form submission for captain login
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear old errors before new request

    const captainData = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem("token", data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      // Set backend or fallback error message
      const backendError = error.response?.data?.message || "Login failed. Please check your credentials.";
      setErrorMsg(backendError);
    }

    setEmail('')
    setPassword('')
  }

  // Render the login form
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 mt-14 md:flex md:flex-col md:mt-14 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'>
            <Link to="/" className='cursor-pointer'>Urbik</Link>
          </h1>

          {/* Email input field */}
          <div className='flex flex-col rounded px-3 mt-15 md:mt-10 gap-2'>

            {/* Error Message */}
            {errorMsg && (
              <p className="bg-red-100 text-red-700 mb-5 border border-red-400 rounded p-2 text-sm md:text-base text-center">
                {errorMsg}
              </p>
            )}

            <h3 className='md:text-xl text-sm font-bold'>What's captain email</h3>
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
            <h3 className='md:text-xl text-sm font-bold'>Enter captain password</h3>
            <input
              className='bg-gray-200 p-2 md:text-xl md:p-2 rounded'
              required
              type="password"
              placeholder='Your password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="group relative z-0 h-10 overflow-hidden overflow-x-hidden rounded-md flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-2 md:justify-center md:h-12 md:w-120 md:mx-auto md:py-3 md:mt-10"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-blue-400 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>

          {/* Registration link */}
          <p className='text-center text-sm md:text-lg'>
            Don't have an account? <Link to="/captain-signup" className='text-blue-500 font-bold'>Register as Captain</Link>
          </p>

          {/* Alternative login option */}
          <Link
            to="/login"
            className='flex item-center justify-center cursor-pointer mt-15 px-2 w-84 m-3 mx-auto bg-orange-500 hover:bg-orange-600 transition-ease-in-out duration-200 text-white py-2 rounded md:justify-center md:w-120 md:mx-auto md:mt-15 md:py-3 md:my-15'
          >
            Sign in as User
          </Link>
        </div>
      </form>
    </>
  )
}

export default CaptainLogin;