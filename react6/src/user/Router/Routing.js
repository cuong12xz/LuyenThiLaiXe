import { BrowserRouter, Routes, Route } from "react-router-dom"

import React from "react"

import { Main } from "../pages/Main"
import Header from "../Layout/Header"
import About from "../Components/About"

import { Landing } from "../pages/Landing"
import Nhap from "../Components/Nhap"
import Footer from "../Layout/Footer"
export default function Routing() {
    return (
        <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <About />
                            <Footer/>
                        </>
                    }
                />
                <Route path=":page" element={<Landing />}>
                    <Route path=":inpage" element={<Main />} />
                </Route>
                {/* <Route path="/About" element={<About />} />
        <Route path="/ProcessingHead/login" element={<><NavBar/><Login/></>} />
        <Route path="/ProcessingHead/register" element={<><NavBar/><Register/></>} /> */}
            </Routes>
    )
}
