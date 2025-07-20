import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFname(name === "f-name" ? value : fname);
    setLname(name === "l-name" ? value : lname);
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: fname,
        lastName: lname
      },
      email: email,
      password: password
    }

    //Connecting from backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem("token", data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }

    setEmail('')
    setFname('')
    setLname('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 mt-14 md:flex md:flex-col md:mt-10 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>
          <div className='flex flex-col px-3 mt-15 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>What's your name</h3>
            <div className='flex gap-2'>
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='First name' name='f-name' value={fname} onChange={handleChange} />
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Last name' name='l-name' value={lname} onChange={handleChange} />
            </div>
          </div>
          <div className='flex flex-col rounded px-3 mt-2 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>What's your email</h3>
            <input className='bg-gray-200 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Your email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 mt-2 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter password</h3>
            <input className='bg-gray-200 p-2 md:text-xl md:p-2 rounded' required type="password" placeholder='Your password' name='password' value={password} onChange={handleChange} />
          </div>
          {/* <Link to="" onClick={submitHandler} className='flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-2 rounded md:justify-center md:w-120 md:mx-auto md:py-3 md:mt-5'>Register</Link> */}
          <Link onClick={submitHandler} className="group relative z-0 h-10 overflow-hidden overflow-x-hidden rounded-md flex  item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-2 md:justify-center md:h-12 md:w-120 md:mx-auto md:py-3 md:mt-10"><span className="relative z-10">Register</span><span className="absolute inset-0 overflow-hidden rounded-md"><span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-400 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span></span></Link>
          <p className='text-center text-sm md:text-lg'>Already registered? <Link to="/login" className='text-blue-500 font-bold'>Login here</Link></p>
          <p className='text-center mx-6 text-[9px] mt-15 md:mt-10 md:text-[12px]'>By proceeding, you confirm to get calls, Whatsapp or SMS messages, including by automated means, from Urbik ans its affiliates to the number provided.</p>
        </div>
      </form>
    </>
  )
}

export default UserSignup