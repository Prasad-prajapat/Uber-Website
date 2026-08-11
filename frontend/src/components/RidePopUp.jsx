import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-10 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
                    <h5 className='text-lg font-medium'>Mamta Prajapat</h5>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>phule market near tawar, jalgaon</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>phule market near tawar, jalgaon</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>


                <div className='w-full mt-5 flex items-center justify-between'>
                    <button onClick={() => {
                        props.setRidePopUpPanel(false)

                    }} className=' bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true)

                    }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>

                </div>


            </div>


        </div>
    )
}

export default RidePopUp
