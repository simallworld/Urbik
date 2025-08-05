import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen relative'>
            <div>
                <h1 className='absolute top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold md:font-bold'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>
                <Link to="/captain/logout" className='fixed top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-2xl ri-logout-box-r-line'></i>
                </Link>
            </div>

            <div className='h-7/8'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div onClick={() => {
                setFinishRidePanel(true)
            }} className='h-1/8 p-6 flex items-center justify-between relative bg-yellow-400'>
                <h5 onClick={() => { }} className="p-1 text-center w-full absolute top-0"><i className="text-3xl font-bold text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <div className='flex flex-row items-center justify-between w-full mt-6'>
                    <h4 className='text-xl font-semibold'>4 km away</h4>
                    <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
                </div>
            </div>

            <div ref={finishRidePanelRef} className="h-full fixed top-50 z-10 bottom-0 bg-white w-full px-3 py-10 pt-12 translate-y-full">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding