// Required imports
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef, useState, useEffect, useContext } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import LiveTracking from '../components/LiveTracking';

// This component serves as the main dashboard for captains after logging in.
// It displays relevant information and controls for captain operations.

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);

    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captainData } = useContext(CaptainDataContext);

    // Join room when captain logs in
    useEffect(() => {
        if (captainData?._id) {
            socket.emit('join', {
                userId: captainData._id,
                userType: 'captain'
            });
        }
    }, [captainData, socket]);

    // Update location
    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation && captainData?._id) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captainData._id,
                        location: {
                            ltd: position.coords.latitude,  // fixed from ltd
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };

        const interval = setInterval(updateLocation, 10000); // update every 10s
        updateLocation(); // initial call
        return () => clearInterval(interval);
    }, [captainData, socket]);

    socket.on('new-ride', (data) => {
        // Handle incoming ride requests
        setRide(data)
        setRidePopupPanel(true);
    });

    async function confirmRide() {
        // Function to confirm the ride
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            captainId: captain._id,
            rideId: ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }

    // Animation for ride popup
    useGSAP(() => {
        gsap.to(ridePopupPanelRef.current, {
            transform: ridePopupPanel ? 'translateY(0%)' : 'translateY(100%)',
            duration: 0.3
        });
    }, [ridePopupPanel]);

    // Animation for confirm ride popup
    useGSAP(() => {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: confirmRidePopupPanel ? 'translateY(0%)' : 'translateY(100%)',
            duration: 0.3
        });
    }, [confirmRidePopupPanel]);

    return (
        <div className='h-screen'>
            <div>
                <h1 className='absolute top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold'>
                    <Link to="/" className='cursor-pointer'>Urbik</Link>
                </h1>
                <Link
                    to="/captain/logout"
                    className='fixed top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full'
                >
                    <i className='text-2xl ri-logout-box-r-line'></i>
                </Link>
            </div>

            <div className='h-4/6'>
                <LiveTracking />

                {/* <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Map"
                /> */}
            </div>
            <div className='h-2/6 p-6'>
                <CaptainDetails />
            </div>

            {/* Ride popup */}
            <div
                ref={ridePopupPanelRef}
                className="fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full"
            >
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            {/* Confirm ride popup */}
            <div
                ref={confirmRidePopupPanelRef}
                className="h-screen fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full"
            >
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    );
};

export default CaptainHome;
