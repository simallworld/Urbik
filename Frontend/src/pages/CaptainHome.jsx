// Required imports
import { Link } from 'react-router-dom';

// This component serves as the main dashboard for captains after logging in.
// It displays relevant information and controls for captain operations.

const CaptainHome = () => {
    return (
        <div className='h-screen'>

            <div>
                <h1 className='absolute top-3 left-3 text-black md:text-black text-3xl md:text-4xl font-bold md:font-bold'><Link to="/" className='cursor-pointer'>Urbik</Link></h1>
                <Link to="/captain/logout" className='fixed top-3 right-3 cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-2xl ri-logout-box-r-line'></i>
                </Link>
            </div>

            <div className='h-4/6'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div className='h-2/6 p-6'>
                <div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg" alt="" />
                            <div>
                                <h3 className='text-lg font-medium'>Shivam Swaroop</h3>
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
                            <p className='text-sm text-gray-800'>Hours Online</p>
                        </div>
                        <div>
                            <i className='text-3xl font-thin ri-booklet-line'></i>
                            <h5 className='text-lg font-semibold'>10.4</h5>
                            <p className='text-sm text-gray-800'>Hours Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptainHome;