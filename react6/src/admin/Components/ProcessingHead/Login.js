import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Home from "../../layout/Home"
import { setToken } from "../../utils/token"

import "./Login"
export default function Login() {
	const [info,setInfo]=useState({})
	const [loginstatus,setLoginStatus]=useState("")
    const navigate = useNavigate()
    // useEffect(()=>{
    //     const getDataName=async()=>{
    //         const response = await axios.get(process.env.REACT_APP_API_HOST+"/user/danhsach")
    //         setInfo(response.data.result)
    //     }
    //     getDataName()
    // },[])
	const login =async(e)=>{
        e.preventDefault()
		const result = await axios.post(process.env.REACT_APP_API_HOST +"/user/login", info)
        setLoginStatus(result.data.message)
       
        if(result.data.success) {
            console.log(result);
            localStorage.setItem("LOGIN", "1")
            localStorage.setItem("TOKEN", result.data.data[0].token)
            localStorage.setItem("HOTEN", result.data.data[0].HoTen)
            localStorage.setItem("LEVEL", result.data.data[0].lv ? result.data.data[0].lv : 0)
            setToken()
        }
        if(result.data.success) {
            navigate("../")
        }
	}
    const handleChange = (e) => {
        setInfo((o) => {
            return {...o, [e.target.name]: e.target.value}
        })
    }
    if(localStorage.getItem('LOGIN')) {
        if(localStorage.getItem('LEVEL')/1 > 0)
            return <Home />
        else {
            return <div>k co quen</div>
        }
    }
    return (
        <div class="wrapper overlay">
            <h1>LOGIN</h1>
            <div class="main-agileinfo">
                <div class="agileits-top">
                    <form action="#" method="post" onSubmit={login}>
                        <div class="leftfloat">Email:</div>
                        <input class="text" type="email" name="Email" placeholder="email" required="" onChange={handleChange} />

                        <div class="leftfloat">Password</div>
                        <input class="text" type="password" name="Password" placeholder="Password" required="" onChange={handleChange} />

                        <div class="clear"> </div>
                        <input type="submit" value="Confirm" />
                    </form>
                    <p>
                        Don't have an Account? <a href="dangky"> Sign Up</a>
                    </p>
					<div>{loginstatus}</div>
                </div>
            </div>

            <ul class="colorlib-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}
