import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {

    const [pickup, setPickup] = ("")
    const [destination, setDestination] = ("")
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

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

    return (
        <div className="h-screen relative">
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
                <div ref={panelRef} className="bg-white h-[0%]">
                    <LocationSearchPanel />
                </div>
            </div>
        </div>
    )
}

export default Home;