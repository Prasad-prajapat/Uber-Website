import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicalPanel from '../components/VehicalPanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehicalPanel, setVehicalPanel] = useState(false)
  const vehicalPanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicalFound, setVehicalFound] = useState(false)
  const vehicalFoundRef = useRef(null)

  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)


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

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(()=>{
    if(vehicalFound){
      gsap.to(vehicalFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(vehicalFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehicalFound])

   useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])


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

        <div ref={vehicalPanelRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-10 pt-12'>
          <VehicalPanel setConfirmRidePanel={setConfirmRidePanel} setVehicalPanel={setVehicalPanel} />      
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicalFound={setVehicalFound}/>     
        </div>

        <div ref={vehicalFoundRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <LookingForDriver setVehicalFound={setVehicalFound}/>
        </div>

        <div ref={waitingForDriverRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>

      </div>
    </div>
  )
}

export default Home
