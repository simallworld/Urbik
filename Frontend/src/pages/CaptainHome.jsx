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
// It displays relevant information and controls for captain operations.

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);

    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    // Join room when captain logs in
    useEffect(() => {
        if (captain?._id) {
            console.log('Captain joining socket room:', captain._id);
            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            });
        }
    }, [captain, socket]);

    // Update location
    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation && captain?._id) {
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

        const interval = setInterval(updateLocation, 10000); // update every 10s
        updateLocation(); // initial call
        return () => clearInterval(interval);
    }, [captain, socket]);

    // Socket event listeners
    useEffect(() => {
        if (!socket) {
            console.warn('Socket not available for event listeners');
            return;
        }

        const handleNewRide = (data) => {
            console.log('🚗 Received new ride notification:', data);
            if (!data) {
                console.error('Received empty ride data');
                return;
            }
            // Handle incoming ride requests
            setRide(data);
            setRidePopupPanel(true);
            console.log('✅ Ride popup panel opened');
        };

        const handleError = (error) => {
            console.error('Socket error:', error);
        };

        const handleConnect = () => {
            console.log('✅ Socket connected successfully');
        };

        const handleDisconnect = () => {
            console.warn('⚠️ Socket disconnected');
        };

        console.log('Setting up socket event listeners for captain');
        socket.on('new-ride', handleNewRide);
        socket.on('error', handleError);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        // Cleanup
        return () => {
            console.log('Cleaning up socket event listeners');
            socket.off('new-ride', handleNewRide);
            socket.off('error', handleError);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);

    async function confirmRide() {
        // Function to confirm the ride
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
        } catch (error) {
            console.error('Error confirming ride:', error);
        }
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
