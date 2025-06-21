import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...value,
      [name]: value
    });
  }
  return (
    <>
      <form>
        <div className='flex flex-col item-center justify-center m-3 md:gap-10 gap-5 md:flex md:flex-col md:mt-10 md:item-center md:justify-center md:h-200 md:w-1/3 w-90 mx-auto'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'>Urbik</h1>
          <div className='flex flex-col rounded px-3 mt-15 md:mt-10 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>What's your email</h3>
            <input className='bg-gray-200 md:text-xl p-2 md:p-3 rounded' required type="text" placeholder='Your email' name='email' value={form.email} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter password</h3>
            <input className='bg-gray-200 p-2 md:text-xl md:p-3 rounded' required type="text" placeholder='Your password' name='password' value={form.password} onChange={handleChange} />
          </div>
          <Link to="" className='flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-3 rounded md:justify-center md:w-120 md:mx-auto md:mt-5'>Login</Link>
          <p className='text-center text-sm md:text-lg'>Don't have an account? <Link to="/signup" className='text-blue-500 font-bold'>Sign up</Link></p>
          <Link to="/captain-login" className='flex item-center justify-center cursor-pointer my-50 px-2 w-84 m-3 mx-auto bg-green-600 text-black py-3 rounded md:justify-center md:w-120 md:mx-auto md:mt-10'>Sign in as Captain</Link>
        </div>
      </form>
    </>
  )
}

export default UserLogin