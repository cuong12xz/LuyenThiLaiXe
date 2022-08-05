import React from 'react'
import {useParams, Outlet} from "react-router-dom"
import Login from '../Components/ProcessingHead/Login'

export const LandingAdmin = () => {
  const {page} = useParams()
  var body
  switch (page) {
     
     
         case "dangnhap":
          body=<Login/>
          break;
      default:
          body= <Outlet />
          break;
  } 
return (
  <div >
      
      {body}
  </div>
)
}
