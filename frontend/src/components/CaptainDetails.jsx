import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIIn4GWGHZFZnZa743z13HZNqLSFeLI_6PXhFphopuQ&s=10" alt="" />
            <h4 className='text-lg font-medium'>Jinisha Prajapat</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹555.25</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex p-3 mt-8 bg-gray-100 rounded-xl items-start gap-5 justify-center'>
          <div className='text-center'>
            <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
            <h5 className='text-lg font-medium'>30 KM</h5>
            <p className='text-sm text-gray-600'>Total Distance</p>
          </div>
          <div className='text-center'>
            <i className=' text-3xl mb-2 font-thin ri-booklet-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
