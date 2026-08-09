import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {

  const navigate = useNavigate()
  const logoutCalled = useRef(false)

  useEffect(()=>{
    if(logoutCalled.current){
      return
    }

    logoutCalled.current = true

    const logout = async ()=>{
      const token = localStorage.getItem('token')

      console.log("TOKEN:", token)


      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data)
      } catch (err) {
        console.log(
          "Logout error:",
          err.response?.data
        )
      } finally {
        localStorage.removeItem('token')
        navigate('/captain-login', {
          replace: true
        })
      }
  }
  logout()
}, [navigate])

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
