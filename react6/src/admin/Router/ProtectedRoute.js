import axios from 'axios'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { setToken } from '../utils/token'
import { logout } from '../utils/user'
const ProtectedRoute = () => {
    if(!localStorage.getItem('TOKEN') ) {
      logout()
      return <Navigate to='/admin'/>
    }

    if(localStorage.getItem('TOKEN') && !axios.defaults.headers.common['Authentication']) {
      setToken()
    }
    if(localStorage.getItem('LEVEL') && localStorage.getItem('LEVEL')/1 > 0)
      return <Outlet />
     
  return (
    <Navigate to='../../'/>
  )
}

export default ProtectedRoute