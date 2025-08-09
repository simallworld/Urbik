import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img
                        className='h-12 w-12 rounded-full object-cover'
                        src={captain?.avatar || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg"}
                        alt="Captain Avatar"
                    />
                    <div>
                        <h3 className='text-lg font-medium capitalize'>
                            {captain?.fullName
                                ? `${captain.fullName.firstName} ${captain.fullName.lastName}`
                                : "Captain Name"}
                        </h3>
                        <p>Captain</p>
                    </div>
                </div>
                <div>
                    <h4 className='text-xl font-semibold text-green-700'>₹256</h4>
                    <p>Current Earnings</p>
                </div>
            </div>

            <div className='flex text-center items-center justify-between rounded-2xl p-4 mt-6 bg-amber-300'>
                <div>
                    <i className='text-3xl font-thin ri-timer-2-line'></i>
                    <h5 className='text-lg font-semibold'>10.4</h5>
                    <p className='text-sm text-gray-800'>Hours Online</p>
                </div>
                <div>
                    <i className='text-3xl font-thin ri-speed-up-line'></i>
                    <h5 className='text-lg font-semibold'>10.4</h5>
                    <p className='text-sm text-gray-800'>Trips Completed</p>
                </div>
                <div>
                    <i className='text-3xl font-thin ri-booklet-line'></i>
                    <h5 className='text-lg font-semibold'>10.4</h5>
                    <p className='text-sm text-gray-800'>Documents Verified</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;
