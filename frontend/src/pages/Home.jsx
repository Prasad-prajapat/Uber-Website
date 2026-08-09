import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehicalPanel, setVehicalPanel] = useState(false)
  const vehicalPanelRef = useRef(null)

  const submitHandler = (e)=>{
    e.preventDefault()

    // setDestination('')
    // setPickup('')
  }

  useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })

      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 24
      })

      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  },[panelOpen])

  useGSAP(()=>{
    if(vehicalPanel){
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehicalPanel])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="../../map.png" alt="" />
      </div>
      
      <div className='h-screen flex flex-col justify-end absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>

          <h5 onClick={()=>{
              setPanelOpen(false)
            }} 
            ref={panelCloseRef}
            className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>

          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input 
              onClick={()=>{
                setPanelOpen(true)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
              type="text" 
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              placeholder='Add a pick-up location' 
            />
            <input 
              onClick={()=>{
                setPanelOpen(true)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
              type="text" 
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }}
              placeholder='Enter your destination' 
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
            <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehicalPanel={vehicalPanel} setVehicalPanel={setVehicalPanel} />
        </div>
        <div ref={vehicalPanelRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-10 pt-14'>
          
          <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={()=>{
            setVehicalPanel(false)
          }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

          <h3 className='text-2xl font-semibold mb-5'>Choose a vehical</h3>
          
          <div className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDn_DoJE_YZWoeBCd6g6hOzVZGfRqCznvil2Ej5Hu85Wp9y0aLBqGrLQ&s=10" alt="" />
              <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'>4</i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹193.20</h2>
          </div>

          <div className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n" alt="" />
              <div className='-ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'>1</i></span></h4>
                  <h5 className='font-medium text-sm'>3 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹65.17</h2>
          </div>

          <div className='flex w-full mb-2 border-2 active:border-black rounded-xl p-3 items-center justify-between'>
              <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
              <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>UberAuto <span><i className='ri-user-3-fill'>3</i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹118.21</h2>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default Home
