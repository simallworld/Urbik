// Required imports
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

// This component serves as the main dashboard for captains after logging in.
// It displays relevant information and controls for captain operations.

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(true)
    const ridePopupPanelRef = useRef(null)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const confirmRidePopupPanelRef = useRef(null)

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen'>

            <div>
                <h1 className='absolute top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold md:font-bold'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>
                <Link to="/captain/logout" className='fixed top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-2xl ri-logout-box-r-line'></i>
                </Link>
            </div>

            <div className='h-4/6'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div className='h-2/6 p-6'>
                <CaptainDetails />
            </div>

            <div ref={ridePopupPanelRef} className="fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full">
                <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            </div>

            <div ref={confirmRidePopupPanelRef} className="h-screen fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full">
                <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    );
};

export default CaptainHome;