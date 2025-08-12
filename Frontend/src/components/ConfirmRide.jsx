import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 onClick={() => { props.setConfirmRidePanel(false) }} className="p-1 text-center w-full absolute top-0"><i className="text-3xl font-bold text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-xl mb-2 font-semibold">Confirm your ride</h3>

            <div className='flex justify-between gap-3 items-center flex-col'>
                <img className='h-50 w-50' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

                <div className='w-full flex flex-col gap-2 mt-5'>
                    <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-fill'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>562/13-B</h3>
                            <p className='text-gray-600 text-sm'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-user-fill'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>Karol Bagh</h3>
                            <p className='text-gray-600 text-sm'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-1 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-currency-line'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-gray-600 text-sm'>Only cash</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide


