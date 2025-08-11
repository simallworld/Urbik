const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => { props.waitingForDriver(false) }} className="p-1 text-center w-full absolute top-0"><i className="text-3xl font-bold text-gray-300 ri-arrow-down-wide-line"></i></h5>

            <div className="flex items-center justify-between">
                <img className='h-12 w-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

                <div className="text-right">
                    <h2 className="text-lg font-medium capitalize">{props.ride?.captain?.fullName?.firstName}</h2>
                    <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain?.vehicle?.plate}</h4>
                    <p className="text-sm text-gray-600">Ciaz</p>
                    <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
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

                    <div className='flex flex-row items-center gap-1 p-2'>
                        <h2 className=' h-8 w-8 text-xl flex items-center justify-center'><i className='ri-currency-line'></i></h2>
                        <div className='flex flex-col'>
                            <h3 className='font-medium text-lg'>₹{props.ride?.fare}</h3>
                            <p className='text-gray-600 text-sm'>Only cash</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WaitingForDriver;