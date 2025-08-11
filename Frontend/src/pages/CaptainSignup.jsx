// Import necessary dependencies
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignup = () => {
  // State for form fields
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  // Hook for programmatic navigation
  const navigate = useNavigate()

  // Context for managing captain's data globally
  const { captain, setCaptain } = useContext(CaptainDataContext)

  // Handle input changes for the main fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "f-name") setFname(value);
    else if (name === "l-name") setLname(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  }

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // parse capacity to number (backend expects number)
    const capacityNumber = vehicleCapacity ? Number(vehicleCapacity) : null;

    // Prepare data object for API request
    const newCaptain = {
      fullName: {
        firstName: fname,
        lastName: lname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: capacityNumber,
        vehicleType: vehicleType
      }

    }
    // NOTE: Ensure this matches how your backend mounts the router.
    // Router file shows routes under /register for captain; commonly the backend mounts at /api/captain
    // So use /api/captain/register — adjust if your server mounts it differently.
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      )

      if (response.status === 201 || response.status === 200) {
        const data = response.data
        // Update global captain state, if backend returns captain object
        setCaptain(data.captain)
        // Store authentication token if sent
        localStorage.setItem("token", data.token)
        // Redirect to captain's home page
        navigate('/captain-home');
        // return;
      }
    } catch (error) {
      // Helpful error output for debugging — check browser console / network tab
      console.error("Registration failed:", error.response?.data || error.message);
      // optionally show an alert or some UI message here
      alert(error.response?.data?.message || "Registration failed")
    }

    // Reset form fields after submission (kept as your original)
    setEmail('')
    setFname('')
    setLname('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 mt-14 md:flex md:flex-col md:mt-10 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'>
            <Link to="/" className='cursor-pointer'>Urbik</Link>
          </h1>
          <div className='flex flex-col px-3 mt-15 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter Captain's name</h3>
            <div className='flex gap-2'>
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='First name' name='f-name' value={fname} onChange={handleChange} />
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Last name' name='l-name' value={lname} onChange={handleChange} />
            </div>
          </div>
          <div className='flex flex-col rounded px-3 mt-2 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter Captain's email</h3>
            <input className='bg-gray-200 md:text-xl p-2 md:p-2 rounded' required type="email" placeholder='Your email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 mt-2 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter password</h3>
            <input className='bg-gray-200 p-2 md:text-xl md:p-2 rounded' required type="password" placeholder='Your password' name='password' value={password} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 gap-2'>
            <div className='flex flex-col rounded mt-2 md:mt-3 gap-2'>
              <h3 className='md:text-xl text-sm font-bold'>Vehicle Details</h3>
              <div className='flex flex-row rounded mt-2 md:mt-3 gap-2'>
                <input
                  className='bg-gray-200 w-[165px] p-2 md:w-[235px] md:text-xl md:p-2 rounded mb-2'
                  required
                  type="text"
                  placeholder='Vehicle Color'
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  className='bg-gray-200 w-[165px] p-2 md:w-[235px] md:text-xl md:p-2 rounded mb-2'
                  required
                  type="text"
                  placeholder='Vehicle Plate Number'
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>
              <div className='flex flex-row rounded mt-2 md:mt-3 gap-2'>
                <input
                  className='bg-gray-200 w-[165px] p-2 md:w-[235px] md:text-xl md:p-2 rounded mb-2'
                  required
                  type="number"
                  placeholder='Vehicle Capacity'
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select
                  className='bg-gray-200 w-[165px] p-2 md:w-[235px] md:text-xl md:p-2 rounded mb-2'
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                  <option value="e-rickshaw">E-Rickshaw</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="group relative z-0 h-10 overflow-hidden overflow-x-hidden rounded-md flex  item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-2 md:justify-center md:h-12 md:w-120 md:mx-auto md:py-3 md:mt-10">
            <span className="relative cursor-pointer z-10">Register</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-400 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
          <p className='text-center text-sm md:text-lg'>Already registered? <Link to="/captain-login" className='text-blue-500 font-bold'>Login</Link></p>
          <p className='text-center w-[270px] mx-auto text-[9px] mt-15 md:w-[270px] md:mt-10 md:text-[12px]'>This site is protected by reCAPTCHA and the <a className='border-b-1' href="#">Google Privacy Policy</a> and <a className='border-b-1' href="#">Terms of service apply</a>.</p>
        </div>
      </form>
    </>
  )
}

export default CaptainSignup
