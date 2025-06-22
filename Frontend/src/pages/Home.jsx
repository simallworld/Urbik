import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>
        <div className="bg-cover h-screen w-full flex flex-col justify-between bg-[url(https://plus.unsplash.com/premium_photo-1725408014925-21ef24fad219?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] md:bg-cover md:bg-[url(https://plus.unsplash.com/premium_photo-1690958385472-b8e011570ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
          <h1 className='text-gray-300 md:text-black text-4xl md:text-5xl font-light md:font-bold mt-7 ml-7'>Urbik</h1>
          <div className='bg-white py-10 px-6 flex flex-col gap-4 md:w-full md:flex md:flex-col md:gap-3 md:items-center md:justify-between'>
            <h2 className='text-2xl font-bold'>Get Started with <strong>Urbik</strong></h2>
            <Link to="/login" className='flex item-center justify-center cursor-pointer w-full bg-black text-white py-3 rounded md:justify-center md:w-1/2'>Continue</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home