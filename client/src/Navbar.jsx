import React from 'react'
import { Link } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import CreateUser from './CreateUser'
import Attendance from './Attendance'
import Calender from './Calender'
import SchedulerList from './SchedulerList'
import BigCalendar from './BigCalendar'
import BitScheduler from './BitScheduler'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbars() {
  return (
  


    <Navbar expand="lg"    bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Ocean Creatures</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
            <Link className="nav-link" to="/" element={ <Home /> } classNameName='link'> Home</Link>
            </Nav.Link>
            <Nav.Link href="#link">  <Link className="nav-link" to="/attendance" element={ <Attendance /> } classNameName='link'> Add Class</Link></Nav.Link>

            <Nav.Link href="#home">
            <Link className="nav-link" to="/calender" element={ <Calender /> } classNameName='link'>Calender</Link>
            </Nav.Link>
            <Nav.Link href="#home">
            <Link className="nav-link" to="/schedulerList" element={ <BigCalendar />  } classNameName='link'>  Attendance List</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars
