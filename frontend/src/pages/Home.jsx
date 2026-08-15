import React, { useContext, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicalPanel from '../components/VehicalPanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext }  from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

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

  // integration
  const [pickupSuggestion, setPickupSuggestion] = useState([])
  const [destinationSuggestion, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)

  const pickupTimerRef = useRef(null)
  const destinationTimerRef = useRef(null)

  const [fare, setFare] = useState({})

  const [vehicalType, setVehicalType] = useState(null)
  const [ride, setRide] = useState(null)


  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)


  useEffect(()=>{

    if (!user?.user?._id) {
        console.log("User ID not available")
        return
    }

    socket.emit('join', {userType: "user", userId: user.user._id})

  }, [user])

  socket.on('ride-confirmed', (ride)=>{
    // console.log("Ride confirmed:", data)
    setVehicalFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', (ride)=>{
    setWaitingForDriver(false)

    // console.log("HOME RIDE:",ride)

    navigate('/riding', { state: { ride }})
  })

  useEffect(() => {
    return () => {
      clearTimeout(pickupTimerRef.current)
      clearTimeout(destinationTimerRef.current)
    }
  }, [])


  const handelPickupChange = async (e) => {
    const value = e.target.value
    setPickup(value)

    clearTimeout(pickupTimerRef.current)

    if (value.length < 3) {
      setPickupSuggestion([])
      return
    }

    pickupTimerRef.current = setTimeout(async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: {
              input: value
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        setPickupSuggestion(response.data)

      } catch (error) {

        console.log("Suggestion error:", error)

      }

    }, 400)


  }

  const handelDestinationChange = async (e) => {
    const value = e.target.value
    setDestination(value)

    clearTimeout(destinationTimerRef.current)

    if (value.length < 3) {
      setDestinationSuggestion([])
      return
    }

    destinationTimerRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: {
            input: e.target.value
          },
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('token')}`
          }
        })
        setDestinationSuggestion(response.data)
      } catch (error) {
        console.log("destination error:", error);
      }
    }, 400)
  }


  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })

      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 24
      })

      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehicalPanel) {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPanel])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicalFound) {
      gsap.to(vehicalFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicalFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehicalPanel(true)
    setPanelOpen(false)

    // console.log("PICKUP:", pickup)
    // console.log("DESTINATION:", destination)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          origin: pickup,
          destination: destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    // console.log("FARE:", response.data)
    setFare(response.data)
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
    {
          origin: pickup,
          destination: destination,
          vehicalType: vehicalType
    },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    // console.log(response.data)
  }




  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="" />
      <div className='h-screen w-screen'>
        {/* <img className='h-full w-full object-cover' src="../../map.png" alt="" /> */}
        <LiveTracking />
      </div>

      <div className='h-screen flex flex-col justify-end absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>

          <h5 onClick={() => {
            setPanelOpen(false)
          }}
            ref={panelCloseRef}
            className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>

          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              value={pickup}
              onChange={(e) => {
                handelPickupChange(e)
              }}
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              value={destination}
              onChange={(e) => {
                handelDestinationChange(e)
              }}
              placeholder='Enter your destination'
            />
          </form>

          <button onClick={findTrip} className='w-full mt-2 bg-black text-white px-4 py-2 rounded-lg'>Find Trip</button>

        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          {/* <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehicalPanel={vehicalPanel} setVehicalPanel={setVehicalPanel} /> */}
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestion : destinationSuggestion}
            setPanelOpen={setPanelOpen}
            setVehicalPanel={setVehicalPanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>

        <div ref={vehicalPanelRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-10 pt-12'>
          <VehicalPanel 
            setVehicalType={setVehicalType} 
            fare={fare} 
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicalPanel={setVehicalPanel} 
          />
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <ConfirmRide 
            createRide={createRide} 
            pickup={pickup}
            fare={fare}
            vehicalType={vehicalType}
            destination={destination}
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicalFound={setVehicalFound} 
            // setVehicalPanel={setVehicalPanel}
          />
        </div>

        <div ref={vehicalFoundRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <LookingForDriver 
            createRide={createRide} 
            pickup={pickup}
            fare={fare}
            destination={destination}
            vehicalType={vehicalType}
            setVehicalFound={setVehicalFound} 
          />
        </div>

        <div ref={waitingForDriverRef} className='fixed w-full bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12'>
          <WaitingForDriver 
            ride={ride}
            setVehicalFound={setVehicalFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
          />
        </div>

      </div>
    </div>
  )
}

export default Home
