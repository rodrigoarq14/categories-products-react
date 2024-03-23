import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/custom.css';
import Logo from './assets/images/logo.png';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { BookmarkStarFill, HouseDoorFill, TagsFill } from 'react-bootstrap-icons';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar bg="dark" variant="dark" expand="lg" sticky='top' className='shadow'>
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="35"
            height="35"
            className="d-inline-block align-center"
          />{' '}
          My Products
        </Navbar.Brand>
        <Navbar.Toggle data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" />
        <Navbar.Offcanvas id="sidebarMenu" placement="start" style={{ width: '70%' }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              My Products
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column justify-content-between px-0'>
            <Nav className="nav-pills fs-5 justify-content-evenly">
              <Nav.Item className='p-3 py-md-1'>
                <Nav.Link href="#home" className='p-3' active>
                  <HouseDoorFill className='ml-4 mb-1'/>
                  {' '}
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='p-3 py-md-1'>
                <Nav.Link href="#categories" className='p-3'>
                  <BookmarkStarFill className='ml-4 mb-1'/>
                  {' '}
                  Categories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='p-3 py-md-1'>
                <Nav.Link href="#products" className='p-3'>
                  <TagsFill className='ml-4 mb-1'/>
                  {' '}
                  Products
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    
  </React.StrictMode>,
)
