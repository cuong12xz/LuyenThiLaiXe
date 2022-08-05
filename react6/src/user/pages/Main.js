import React from "react"
import { useParams } from "react-router-dom"
import QLLyThuyet from "../Components/HocLyThuyet/QLLyThuyet"
import MeoThi from "../Components/MeoThi/MeoThi"
import QLThiSatHach from "../Components/ThiSatHach/QLThiSatHach"
import "./1.css"
import NavBar from "../Layout/NavBar"
import Footer from "../Layout/Footer"
export const Main = () => {
    const { page, inpage } = useParams()
    var body
    switch (page) {
        case "thisathach":
            body = <QLThiSatHach action={inpage} />
            //<div className='alicecenter'><NavBar/><div className='aliceleft'><QLThiSatHach action={inpage} /></div><Footer/></div>
            break
        // case "meothi":                   
        //     body = <MeoThi action={inpage} />
        //     break
        case "hoclythuyet":
            body = <QLLyThuyet action={inpage} />
            break
        default:
            break
    }
    return <div className="alicecenter">{body}</div>
}