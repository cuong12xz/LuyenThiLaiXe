import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Header from "../../Layout/Header"
import About from "../About"

import "./Register"
export default function Login() {
	const [info,setInfo]=useState({})
	const [loginstatus,setLoginStatus]=useState("")
    const navigate = useNavigate()
    const [searchParams, setSearchParams ]= useSearchParams()
    useEffect(()=>{
        const isRegister = searchParams.get("success")
        console.log(isRegister);
        setLoginStatus(() => {
            if(isRegister === "true") {
                return "Dang ky thanh cong, vui long dang nhap lai"
            }
            return ""
        })
    },[])
	const login =async(e)=>{
        e.preventDefault()
		const result = await axios.post(process.env.REACT_APP_API_HOST +"/user/login", info)
        setLoginStatus(result.data.message)
        if(result.data.success) {
            localStorage.setItem("LOGIN", "1")
            localStorage.setItem("HOTEN", result.data.data[0].HoTen)
            localStorage.setItem("LEVEL", result.data.data[0].lv)
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
    // if(localStorage.getItem('LOGIN')) {
    //     return<> <Header />
    //     <About /></>
    // }
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
