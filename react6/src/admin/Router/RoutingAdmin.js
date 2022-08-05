import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Login from '../Components/ProcessingHead/Login';
import Home from '../layout/Home';
import { LandingAdmin } from '../pages/LandingAdmin';
import { MainAdmin } from '../pages/MainAdmin';
import ProtectedRoute from './ProtectedRoute';
import './admin.css'
export const RoutingAdmin = () => {

          
  return (
    
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path=':page'  element={<LandingAdmin />}>
              <Route path=':inpage' element={<MainAdmin/>}/>
            </Route>
          </Route>
        </Routes>
 
  )
}
