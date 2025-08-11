import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => { props.setRidePopupPanel(false) }} className="p-1 text-center w-full absolute top-0"><i className="text-3xl font-bold text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-xl mb-2 font-semibold">New Ride Available!</h3>

            <div className='flex items-center justify-between bg-gray-100 rounded-xl p-2'>
                <div className='flex items-center gap-4'>
                    <img className='h-12 w-12 rounded-lg object-cover' src="https://photosbull.com/wp-content/uploads/2024/05/1000060410-641x1024.jpg" alt="" />
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h3>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='text-xs bg-yellow-300 px-2 py-1 rounded-3xl'>ApplePay</p>
                            <p className='text-xs bg-yellow-300 px-2 py-1 rounded-3xl'>Discount</p>
                        </div>
                    </div>
                </div>
                <div className='text-right'>
                    <h4 className='text-xl font-semibold text-green-700'>₹{props.ride?.fare}</h4>
                    <p className='text-sm font-base text-gray-600'>3.4 km</p>
                </div>
            </div>

            <div className='flex justify-between gap-3 items-center flex-col'>
                <div className='w-full flex flex-col gap-2 mt-5'>
                    <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-fill'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>562/13-B</h3>
                            <p className='text-gray-600 text-sm'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-user-fill'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>Karol Bagh</h3>
                            <p className='text-gray-600 text-sm'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    {/* <div className='flex flex-row items-center gap-1 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-currency-line'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>₹173</h3>
                            <p className='text-gray-600 text-sm'>Only cash</p>
                        </div>
                    </div> */}
                </div>

                <div className='w-full flex flex-row gap-2 mt-5'>
                    <button onClick={() => {
                        props.setRidePopupPanel(false);
                    }} className='mt-5 w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        props.confirmRide();
                    }} className='mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp