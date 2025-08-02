import React from 'react'

const LocationSearchPanel = (props) => {

  // Sample array for location data
  const locations = [
    "N42 Bishanpura, Noida",
    "Sector 62, Noida",
    "Sector 55, Noida",
    "Sector 18, Noida",
  ]

  return (
    <div>
      {/* This is sample data as of now */}
      {
        locations.map((loc, idx) => {
          return <div onClick={() => {
            props.setvehiclePanel(true)
            props.setPanelOpen(false)
          }} key={idx} className='flex p-2 gap-4 border-2 border-white active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 w-8 p-2 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
            <h4 className='font-medium w-[90%] text-gray-800'>{loc}</h4>
          </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel;