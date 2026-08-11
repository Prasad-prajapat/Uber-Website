import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [vehicalColor, setvehicalColor] = useState('')
  const [vehicalPlate, setvehicalPlate] = useState('')
  const [vehicalCapacity, setvehicalCapacity] = useState('')
  const [vehicalType, setvehicalType] = useState('')

  const { captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicalColor,
        plateNumber: vehicalPlate,
        capacity: vehicalCapacity,
        vehicleType: vehicalType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

    if(response.status === 201){
      const data = response.data     // captain and token send server
      setCaptain(data.captain)

      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setvehicalCapacity('')
    setvehicalColor('')
    setvehicalPlate('')
    setvehicalType('')

  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-1' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />  
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg w-full font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First Name'
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last Name'
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@gmail.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehical Information</h3>
          <div>
            <div className='flex gap-4 mb-5'>
              <input
                value={vehicalColor}
                onChange={(e) => {
                  setvehicalColor(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehical color'
              />

              <input
                value={vehicalPlate}
                onChange={(e) => {
                  setvehicalPlate(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehical plate number'
              />

            </div>

            <div className='flex gap-4 mb-5'>
              <input
                value={vehicalCapacity}
                onChange={(e) => {
                  setvehicalCapacity(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="Number"
                placeholder='Vehical capacity'
              />

              <select
                value={vehicalType}
                onChange={(e) => {
                  setvehicalType(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              >
                <option value="" disabled>Vehical Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>

            </div>
          </div>
          
          
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
            Create account
          </button>

        </form>
        <p className='text-center'>Already have a account <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
