
import React, { Component } from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom"




import Routing from './user/Router/Routing'

import './App.css';
import { RoutingAdmin } from './admin/Router/RoutingAdmin';
import Test from './user/Components/Test/Test';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/admin/*'element={<RoutingAdmin/>} />
        <Route path='/*' element={<Routing/>} />
        <Route path='*' element= {<div>Nothing here</div>} />
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
