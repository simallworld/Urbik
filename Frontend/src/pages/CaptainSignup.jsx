import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFname(name === "f-name" ? value : fname);
    setLname(name === "l-name" ? value : lname);
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='flex flex-col item-center justify-center m-3 w-90 mx-auto gap-5 md:flex md:flex-col md:mt-10 md:item-center md:justify-center md:w-1/3 md:gap-5'>
          <h1 className='text-black md:text-black text-4xl md:text-5xl font-bold md:font-bold mt-3 ml-3'>Urbik</h1>
          <div className='flex flex-col px-3 mt-15 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter Captain's name</h3>
            <div className='flex gap-2'>
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='First name' name='f-name' value={fname} onChange={handleChange} />
              <input className='bg-gray-200 w-1/2 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Last name' name='l-name' value={lname} onChange={handleChange} />
            </div>
          </div>
          <div className='flex flex-col rounded px-3 mt-5 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter Captain's email</h3>
            <input className='bg-gray-200 md:text-xl p-2 md:p-2 rounded' required type="text" placeholder='Your email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='flex flex-col rounded px-3 mt-5 md:mt-3 gap-2'>
            <h3 className='md:text-xl text-sm font-bold'>Enter password</h3>
            <input className='bg-gray-200 p-2 md:text-xl md:p-2 rounded' required type="text" placeholder='Your password' name='password' value={password} onChange={handleChange} />
          </div>
          <Link to="" onClick={submitHandler} className='flex item-center justify-center cursor-pointer px-2 w-84 m-3 mx-auto bg-black text-white py-3 rounded md:justify-center md:w-120 md:mx-auto md:mt-3'>Register</Link>
          <p className='text-center text-sm md:text-lg'>Already registered? <Link to="/captain-login" className='text-blue-500 font-bold'>Login</Link></p>
          <p className='text-center w-[270px] mx-auto text-[9px] mt-30 md:w-[270px] md:mt-15 md:text-[12px]'>This site is protected by reCAPTCHA and the <a className='border-b-1' href="#">Google Privacy Policy</a> and <a className='border-b-1' href="#">Terms of service apply</a>.</p>
        </div>
      </form>
    </>
  )
}

export default CaptainSignup