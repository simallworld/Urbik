import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/vehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {

    const [pickup, setPickup] = ("")
    const [destination, setDestination] = ("")
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setvehiclePanel] = useState(false)
    const [confirmRidePanel, setconfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 25,
                // opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                // opacity: 0,
                padding: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    return (
        <div className="h-screen relative overflow-hidden">
            <h1 className='absolute top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold md:font-bold'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>
            <div className='h-screen w-screen'>
                {/* Image for temporary use */}
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className="absolute opacity-0 top-6 right-8 text-2xl cursor-pointer"><i className="ri-arrow-down-wide-line"></i></h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-2 bg-gray-700 top-24 left-10 rounded-full"></div>
                        <input className="bg-[#eee] px-10 py-2 text-lg rounded-lg w-full mt-5" type="text" onClick={() => setPanelOpen(true)} value={pickup} onChange={(e) => { setPickup(e.target.value) }} placeholder="Add a pick-up location" />
                        <input className="bg-[#eee] px-10 py-2 text-lg rounded-lg w-full mt-3" type="text" onClick={() => setPanelOpen(true)} value={destination} onChange={(e) => { setDestination(e.target.value) }} placeholder="Enter your destination" />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white">
                    <LocationSearchPanel setPanelOpen={setPanelOpen} setvehiclePanel={setvehiclePanel} />
                </div>
            </div>

            <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full translate-y-full">
                <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
            </div>

            <div ref={confirmRidePanelRef} className="fixed z-10 bottom-0 bg-white px-3 py-6 pt-12 w-full translate-y-full">
                <ConfirmRide setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 bg-white px-3 py-6 pt-12 w-full translate-y-full">
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>

            <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 bg-white px-3 py-6 pt-12 w-full">
                <WaitingForDriver waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home;