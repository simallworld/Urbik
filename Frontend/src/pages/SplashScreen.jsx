import { Link } from 'react-router-dom'

const SplashScreen = () => {
  return (
    <>
      <div>
        <div className="bg-cover h-screen w-full flex flex-col justify-between bg-[url(https://plus.unsplash.com/premium_photo-1725408014925-21ef24fad219?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] md:bg-cover md:bg-[url(https://images.unsplash.com/photo-1602940659805-770d1b3b9911?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
          <h1 className='text-gray-300 md:text-white text-4xl md:text-5xl font-light md:font-bold mt-7 ml-7'><Link to="/" className="cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden bg-transparent px-4 text-white"><span className="relative inline-flex overflow-hidden"><div className="absolute origin-bottom transition duration-500 [transform:translateX(-140%)_skewX(33deg)] group-hover:[transform:translateX(0)_skewX(0deg)] text-blue-400">Urbik</div><div className="transition duration-500 [transform:translateX(0%)_skewX(0deg)] group-hover:[transform:translateX(150%)_skewX(33deg)]">Urbik</div></span></Link></h1>
          <div className='bg-white py-10 px-6 flex flex-col gap-4 items-center md:w-full md:flex md:flex-col md:gap-3 md:items-center md:justify-between'>
            <h2 className='text-2xl font-bold'>Get Started with <strong className="hover:text-blue-400 transition duration-300 ease-in-out cursor-pointer group relative h-12 overflow-hidden bg-transparent text-neutral-950"><span className="relative inline-flex"><span className="duration-700 [transition-delay:0.02s] group-hover:[transform:rotateY(360deg)]">U</span><span className="duration-700 [transition-delay:0.04s] group-hover:[transform:rotateY(360deg)]">r</span><span className="duration-700 [transition-delay:0.06s] group-hover:[transform:rotateY(360deg)]">b</span><span className="duration-700 [transition-delay:0.08s] group-hover:[transform:rotateY(360deg)]">i</span><span className="duration-700 [transition-delay:0.10s] group-hover:[transform:rotateY(360deg)]">k</span></span></strong></h2>
            {/* <Link to="/login" className='flex item-center justify-center cursor-pointer w-full bg-black text-white py-3 rounded md:justify-center md:w-2/6 hover:animate-bounce'>Continue</Link> */}
            <Link to="/login" className="group relative h-12 items-center overflow-hidden rounded-md bg-neutral-950 px-6 font-sm text-white transition duration-400 ease-in-out hover:scale-103 flex item-center justify-center cursor-pointer w-full py-3 md:justify-center md:w-2/6"><span>Continue</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SplashScreen;