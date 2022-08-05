import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import MeoThi from '../Components/MeoThi/MeoThi'
import QLThiSatHach from '../Components/ThiSatHach/QLThiSatHach'
import Register from '../Components/ProcessingHead/Register'
import Login from '../Components/ProcessingHead/Login'

import './1.css'
import Footer from '../Layout/Footer'
import NavBar from '../Layout/NavBar'
import BienBao from '../Components/BienBao/BienBao'
import HuongDan from '../Components/HuongDan/HuongDan'
import LoaiLyThuyet from '../Components/LoaiLyThuyet/LoaiLyThuyet'
export const Landing = () => {
    const {page} = useParams()
    var body
    const [showNav, setShowNav] = useState(true)
    // useEffect(()=> {
    //   setShowNav(()=> {
    //     if(page ==="dangky" || page === "dangnhap") {
    //       return false
    //     }
    //     return true
    //   })
    // },[page])
    switch (page) {
       
        case "meothi":
            body=<MeoThi/>
            break
            case "dangky":
            body=<Register/>
           break
           case "dangnhap":
            body=<Login/>
            break;
            case "bienbao":
              body=<BienBao />
              break
              case"huongdan":
              body=<HuongDan />
              break;
              case"loailythuyet":
              body=<LoaiLyThuyet/>
              break
        default:
            body= <Outlet />
            break;
    } 
  return (
    <div >
        {showNav && <NavBar/>}
        {body}
        {showNav && <Footer/>}
    </div>
  )
}
