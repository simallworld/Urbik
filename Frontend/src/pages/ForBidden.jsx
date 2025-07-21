// Required imports for the component
import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom';

// Forbidden component for displaying 403 Access Denied page
const ForBidden = () => {
  return (
    // Main container with full viewport dimensions and blue background
    <div className='relative bg-blue-400 overflow-hidden flex flex-col gap-10 items-center justify-center w-[100vw] h-[100vh]'>
      // First animated gradient background element
      <div className='absolute w-[800px] h-[400px] bg-gradient-to-r from-pink-500 backdrop-blur via-yellow-400 to-cyan-400 rounded-full blur-3xl opacity-60 top-1/9 left-1 animate-spin-slow'></div>
      // Main error code display
      <h1 className='text-[120px] md:text-[250px] font-bold relative z-1 mt-[-100px]'>403</h1>
      // Error message heading
      <h3 className='text-[50px] md:text-[100px] font-bold relative z-1 mt-[-70px] md:mt-[-100px]'>Access Denied</h3>
      // Error description text
      <p className='text-[14px] md:text-[20px] w-90 md:w-130 text-center font-semi relative z-1 mt-[-40px]'>The page you're trying to access has restricted access. Please refer to your system administrator</p>

      // Second animated gradient background element
      <div className="absolute w-[800px] h-[300px] bg-gradient-to-bl from-purple-500 via-indigo-400 to-blue-400 rounded-full blur-2xl opacity-50 top-1/9 right-1/4 animate-spin-slow"></div>
      // Third animated gradient background element
      <div className='absolute w-[800px] h-[900px] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 rounded-full blur-3xl backdrop-blur opacity-80 top-1/8 left-3/4 animate-pulse'></div>

      // Container for the "Go back" button and drip animation
      <div className="relative inline-block group">
        // Navigation link to return to home page
        <Link to="/" className="px-10 py-3 hover:bg-black hover:text-white hover:border-black transform transition-all duration-300 text-black text-lg font-bold cursor-pointer border-3 rounded-lg">
          Go back
        </Link>

        // Decorative paint drip animation container
        <div className="absolute left-1/2 top-full -translate-x-1/2 flex mt-5 gap-2 md:mt-4">
          // Paint drip elements with different sizes and delay animations
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-drip delay-100"></span>
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-drip delay-200"></span>
          <span className="w-2.5 h-2.5 bg-indigo-300 rounded-full animate-drip delay-300"></span>
        </div>
      </div>
    </div>
  )
}

// Export the Forbidden component as default
export default ForBidden;