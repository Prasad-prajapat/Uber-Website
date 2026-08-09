import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

  const navigate = useNavigate()
  const logoutCalled = useRef(false)

  useEffect(() => {
    if (logoutCalled.current) {
      return
    }

    logoutCalled.current = true

    const logout = async () => {
      const token = localStorage.getItem('token')

      // console.log("TOKEN:", token)

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log(
          "Logout error:",
          error.response?.data
        )
      } finally {

        localStorage.removeItem('token')

        navigate('/login', {
          replace: true
        })
      }
    }
    logout()
  }, [navigate])

  return (
    <div>
      User Logout
    </div>
  )
}

export default UserLogout
