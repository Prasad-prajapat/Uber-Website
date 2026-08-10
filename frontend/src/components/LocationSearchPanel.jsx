import React from 'react'

const LocationSearchPanel = (props) => {

    //  Sample array of location
    const location = [
        "2A, Near Kasturi Hotel, Upasani Nagar, Jalgaon",
        "2B, Near M.I.D.C, Upasani Nagar, Jalgaon",
        "2C, Near Mehrun, Upasani Nagar, Jalgaon",
        "2D, Near stadium, Upasani Nagar, Jalgaon"
    ]

  return (
    <div>
      {
        location.map(function(elem, idx){
            return <div key={idx} onClick={()=>{
                props.setVehicalPanel(true)
                props.setPanelOpen(false)
            }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel
