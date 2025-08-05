import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>

            <Link to="/home" className='fixed top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className='text-2xl ri-home-5-line'></i>
            </Link>

            <div className='h-1/2'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div className='h-1/2 p-4'>

                <div className="flex items-center justify-between">
                    <img className='h-18 w-18' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

                    <div className="text-right">
                        <h2 className="text-lg font-medium">Shivam</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">UP72 CK 5740</h4>
                        <p className="text-sm text-gray-600">Ciaz</p>
                    </div>
                </div>

                <div className='flex justify-between gap-3 items-center flex-col'>

                    <div className='w-full flex flex-col gap-2 mt-5'>
                        <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                            <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-fill'></i></h2>
                            <div className='flex flex-col'>
                                <h3 className='font-medium text-lg'>562/13-B</h3>
                                <p className='text-gray-600 text-sm'>N42 Bishanpura, Noida</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-1 border-b-1 border-gray-300 p-2'>
                            <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-map-pin-user-fill'></i></h2>
                            <div className='flex flex-col'>
                                <h3 className='font-medium text-lg'>Karol Bagh</h3>
                                <p className='text-gray-600 text-sm'>New Delhi</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-1 p-2'>
                            <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-currency-line'></i></h2>
                            <div className='flex flex-col'>
                                <h3 className='font-medium text-lg'>₹173</h3>
                                <p className='text-gray-600 text-sm'>Only cash</p>
                            </div>
                        </div>
                    </div>

                </div>

                <button className='mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding