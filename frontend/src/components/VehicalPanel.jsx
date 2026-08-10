import React from 'react'

const VehicalPanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={()=>{
            props.setVehicalPanel(false)
          }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

          <h3 className='text-2xl font-semibold mb-5'>Choose a vehical</h3>
          
          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDn_DoJE_YZWoeBCd6g6hOzVZGfRqCznvil2Ej5Hu85Wp9y0aLBqGrLQ&s=10" alt="" />
              <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'>4</i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹193.20</h2>
          </div>

          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n" alt="" />
              <div className='-ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'>1</i></span></h4>
                  <h5 className='font-medium text-sm'>3 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹65.17</h2>
          </div>

          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
              <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>UberAuto <span><i className='ri-user-3-fill'>3</i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹118.21</h2>
          </div>
    </div>
  )
}

export default VehicalPanel
