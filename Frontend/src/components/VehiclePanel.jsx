import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => { props.setvehiclePanel(false) }} className="p-1 text-center w-full absolute top-0"><i className="text-3xl font-bold text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-xl mb-2 font-semibold">Select a vehicle</h3>
            <div onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle("car") }} className="flex border-3 border-white active:border-black w-full mb-2 p-3 items-center justify-between rounded-lg">
                <img className="h-20 w-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-bold text-xl">UrbikGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-md">20 mins away</h5>
                    <p className="font-normal text-sm text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-xl font-bold">₹{props.fare.car}</h2>
            </div>

            <div onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle("bike") }} className="flex w-full mb-2 p-3 items-center justify-between rounded-lg border-3 border-white active:border-black">
                <img className="h-20 w-20 object-cover" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-bold text-xl">UrbikMoto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className="font-medium text-md">2 mins away</h5>
                    <p className="font-normal text-sm text-gray-600">Affordable, motorcycle rides</p>
                </div>
                <h2 className="text-xl font-bold">₹{props.fare.bike}</h2>
            </div>

            <div onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle("auto") }} className="flex w-full mb-2 p-3 items-center justify-between rounded-lg border-3 border-white active:border-black">
                <img className="h-20 w-20 object-cover" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-bold text-xl">UrbikAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className="font-medium text-md">7 mins away</h5>
                    <p className="font-normal text-sm text-gray-600">Affordable auto rides</p>
                </div>
                <h2 className="text-xl font-bold">₹{props.fare.auto}</h2>
            </div>

            <div onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle("eRikshaw") }} className="flex w-full mb-2 p-3 items-center justify-between rounded-lg border-3 border-white active:border-black">
                <img className="h-20 w-20 object-cover" src="https://e7.pngegg.com/pngimages/691/924/png-clipart-jangid-motors-car-auto-rickshaw-gurugram-auto-rickshaw-india-mode-of-transport.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-bold text-xl">UrbikE-Riksha <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-md">13 mins away</h5>
                    <p className="font-normal text-sm text-gray-600">Affordable eRikshaw rides</p>
                </div>
                <h2 className="text-xl font-bold">₹{props.fare.eRikshaw}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel