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
import axios from 'axios';

// This component serves as the main dashboard for captains after logging in.
const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);
    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    // Emit join event and location updates only when captain is defined
    useEffect(() => {
        if (!captain || !captain._id) return;

        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        return () => clearInterval(locationInterval);
    }, [captain, socket]);

    // Listen for new ride event
    useEffect(() => {
        const handleNewRide = (data) => {
            setRide(data);
            setRidePopupPanel(true);
        };

        socket.on('new-ride', handleNewRide);

        return () => {
            socket.off('new-ride', handleNewRide);
        };
    }, [socket]);

    async function confirmRide() {
        if (!ride || !captain) return;

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }

    useGSAP(() => {
        gsap.to(ridePopupPanelRef.current, {
            transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        });
    }, [ridePopupPanel]);

    useGSAP(() => {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        });
    }, [confirmRidePopupPanel]);

    return (
        <div className='h-screen'>
            <div className="pointer-events-none">
                <h1 className='absolute z-20 top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold pointer-events-auto'>
                    <Link to="/" className='cursor-pointer'>Urbik</Link>
                </h1>
                <Link
                    to="/captain/logout"
                    className='fixed z-20 top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full pointer-events-auto'
                >
                    <i className='text-2xl ri-logout-box-r-line'></i>
                </Link>
            </div>

            <div className='h-4/6'>
                <LiveTracking />
            </div>

            <div className='h-2/6 p-6'>
                <CaptainDetails />
            </div>

            {/* Ride popup */}
            <div
                ref={ridePopupPanelRef}
                className="fixed z-30 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full pointer-events-auto"
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
                className="h-screen fixed z-30 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full pointer-events-auto"
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
