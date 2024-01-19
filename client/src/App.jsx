import React from 'react'
import Navbar from './Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Attendance from './Attendance'
import Calender from './Calender'
import BigCalendar from './BigCalendar'
import BitScheduler from './BitScheduler'

import SchedulerList from './SchedulerList'

import './time.css'





function App() {
  return (
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path='/' element={ <Home /> }></Route>
      <Route path='/login' element={ <Login /> }></Route>
      <Route path='/create' element={<CreateUser />}></Route>
      <Route path='/update/:id' element={<UpdateUser />}></Route>
      <Route path='/attendance' element={<Attendance /> }></Route>
      <Route path='/calender' element={ <Calender /> }></Route>
      <Route path='/schedulerList' element={ <SchedulerList /> }></Route>      

    </Routes>
 
   </BrowserRouter>
     
  )
}

export default App
