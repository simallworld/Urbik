import React, { useEffect, useRef, useState, useContext } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
    // inputs
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");

    // UI panels
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    // state toggles
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

    // suggestions
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    // which field is focused (was missing previously)
    const [focused, setFocused] = useState(null);

    // fare / ride info
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    // JOIN and socket listeners: put inside useEffect and cleanup listeners on unmount
    useEffect(() => {
        if (!socket || !user) return;

        console.log('User joining socket room:', user._id);
        socket.emit("join", { userType: "user", userId: user._id });

        const handleRideConfirmed = (ride) => {
            console.log('Ride confirmed by captain:', ride);
            setVehicleFound(false);
            setWaitingForDriver(true);
            setRide(ride);
        };

        const handleRideStarted = (ride) => {
            console.log('Ride started by captain:', ride);
            setWaitingForDriver(false);
            // navigate to riding and pass ride via state
            navigate("/riding", { state: { ride } });
        };

        socket.on("ride-confirmed", handleRideConfirmed);
        socket.on("ride-started", handleRideStarted);

        // cleanup
        return () => {
            socket.off("ride-confirmed", handleRideConfirmed);
            socket.off("ride-started", handleRideStarted);
        };
    }, [socket, user, navigate]);

    // Handlers: use these in the inputs so suggestions are populated
    const handlePickupChange = async (e) => {
        const value = e.target.value;
        setPickup(value);
        if (!value) {
            setPickupSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setPickupSuggestions(response.data);
        } catch (err) {
            console.error("pickup suggestions error", err);
        }
    };

    const handleDestinationChange = async (e) => {
        const value = e.target.value;
        setDestination(value);
        if (!value) {
            setDestinationSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setDestinationSuggestions(response.data);
        } catch (err) {
            console.error("destination suggestions error", err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    // GSAP animations: replaced useGSAP with useEffect to avoid relying on third-party react hooks
    useGSAP(() => {
        if (!panelRef.current || !panelCloseRef.current) return;

        if (panelOpen) {
            gsap.to(panelRef.current, { height: "70%", padding: 24 });
            gsap.to(panelCloseRef.current, { opacity: 1 });
        } else {
            gsap.to(panelRef.current, { height: "0%", padding: 0 });
            gsap.to(panelCloseRef.current, { opacity: 0 });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (!vehiclePanelRef.current) return;
        if (vehiclePanel)
            gsap.to(vehiclePanelRef.current, { transform: "translateY(0)" });
        else gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)" });
    }, [vehiclePanel]);

    useGSAP(() => {
        if (!confirmRidePanelRef.current) return;
        if (confirmRidePanel)
            gsap.to(confirmRidePanelRef.current, { transform: "translateY(0)" });
        else
            gsap.to(confirmRidePanelRef.current, { transform: "translateY(100%)" });
    }, [confirmRidePanel]);

    useGSAP(() => {
        if (!vehicleFoundRef.current) return;
        if (vehicleFound)
            gsap.to(vehicleFoundRef.current, { transform: "translateY(0)" });
        else gsap.to(vehicleFoundRef.current, { transform: "translateY(100%)" });
    }, [vehicleFound]);

    useGSAP(() => {
        if (!waitingForDriverRef.current) return;
        if (waitingForDriver)
            gsap.to(waitingForDriverRef.current, { transform: "translateY(0)" });
        else
            gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)" });
    }, [waitingForDriver]);

    // Find trip -> open vehicle panel and fetch fare
    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
                {
                    params: { pickup, destination },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setFare(response.data);
        } catch (err) {
            console.error("get fare error", err);
        }
    }

    // create ride -> call API and update UI states accordingly
    async function createRide() {
        try {
            console.log('Creating ride with data:', {
                userId: user._id,
                pickup,
                destination,
                vehicleType,
            });

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    userId: user._id, // ✅ send userId
                    pickup,
                    destination,
                    vehicleType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const createdRide = response.data;
            console.log('Ride created successfully:', createdRide);
            setRide(createdRide);

            // Close panels and show "looking for driver" panel
            setConfirmRidePanel(false);
            setVehiclePanel(false);
            setVehicleFound(true);

            // Optionally notify server via socket
            if (socket) {
                console.log('Emitting ride-created event via socket');
                socket.emit("ride-created", createdRide);
            } else {
                console.warn('Socket not available for ride-created event');
            }

            return createdRide;
        } catch (err) {
            console.error("create ride error", err);
            alert('Failed to create ride. Please try again.');
            throw err;
        }
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <div className="pointer-events-none">
                <h1 className="absolute z-20 top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold md:font-bold pointer-events-auto">
                    <Link to="/" className="cursor-pointer">
                        Urbik
                    </Link>
                </h1>
                <Link
                    to="/user/logout"
                    className="absolute z-20 top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full pointer-events-auto"
                >
                    <i className="text-2xl ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className="h-4/6">
                <LiveTracking />
            </div>

            <div className="flex flex-col justify-end absolute h-screen top-0 w-full pointer-events-none">
                <div className="h-[30%] z-20 p-6 bg-white relative pointer-events-auto">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute opacity-0 top-6 right-8 text-2xl cursor-pointer"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <div className="line absolute h-16 w-2 bg-gray-700 top-24 left-10 rounded-full"></div>

                        {/* use the handlers so suggestions are filled */}
                        <input
                            className="bg-[#eee] px-10 py-2 text-lg rounded-lg w-full mt-5"
                            type="text"
                            onClick={() => {
                                setPanelOpen(true);
                                setFocused("pickup");
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            placeholder="Add a pick-up location"
                        />
                        <input
                            className="bg-[#eee] px-10 py-2 text-lg rounded-lg w-full mt-3"
                            type="text"
                            onClick={() => {
                                setPanelOpen(true);
                                setFocused("destination");
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className="w-full bg-black text-white py-2 rounded-lg mt-5"
                    >
                        Find trip
                    </button>
                </div>

                <div ref={panelRef} className="bg-white pointer-events-auto">
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        pickup={pickup}
                        setPickup={setPickup}
                        destination={destination}
                        setDestination={setDestination}
                        focused={focused}
                        pickupSuggestions={pickupSuggestions}
                        destinationSuggestions={destinationSuggestions}
                        setPickupSuggestions={setPickupSuggestions}
                        setDestinationSuggestions={setDestinationSuggestions}
findTrip={findTrip}
                    />
                </div>
            </div>

            <div
                ref={vehiclePanelRef}
                className="fixed z-30 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full pointer-events-auto"
            >
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div
                ref={confirmRidePanelRef}
                className="fixed z-30 bottom-0 bg-white px-3 py-6 pt-12 w-full translate-y-full pointer-events-auto"
            >
                {/* passenger was undefined previously; pass user as passenger */}
                <ConfirmRide
                    passenger={user}
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={vehicleFoundRef}
                className="fixed z-30 bottom-0 bg-white px-3 py-6 pt-12 w-full translate-y-full pointer-events-auto"
            >
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* waitingForDriver should also start hidden (translate-y-full) */}
            <div
                ref={waitingForDriverRef}
                className="fixed z-30 bottom-0 bg-white px-3 py-6 pt-12 w-full translate-y-full pointer-events-auto"
            >
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
};

export default Home;
