import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 md:flex md:flex-col md:mt-14 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'>Urbik</h1>
          <div className='flex flex-col rounded px-3 mt-15 md:mt-10 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>What's captain email</h3>
            <input className='bg-gray-200 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Your email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter captain password</h3>
            <input className='bg-gray-200 p-2 md:text-xl md:p-2 rounded' required type="text" placeholder='Your password' name='password' value={password} onChange={handleChange} />
          </div>
          <Link to="" onClick={submitHandler} className='flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-3 rounded md:justify-center md:w-120 md:mx-auto md:mt-10'>Login</Link>
          <p className='text-center text-sm md:text-lg'>Don't have an account? <Link to="/captain-signup" className='text-blue-500 font-bold'>Register as Captain</Link></p>
          <Link to="/login" className='flex item-center justify-center cursor-pointer mt-45 px-2 w-84 m-3 mx-auto bg-orange-600 text-black py-3 rounded md:justify-center md:w-120 md:mx-auto md:mt-15 md:my-15'>Sign in as User</Link>
        </div>
      </form>
    </>
  )
}

export default CaptainLogin