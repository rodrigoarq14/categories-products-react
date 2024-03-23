import React from 'react';
import ReactDOM from 'react-dom/client';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { HomePage } from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/images/logo.png';
import { Container, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { BookmarkStarFill, HouseDoorFill, TagsFill } from 'react-bootstrap-icons';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './assets/styles/custom.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
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
                  <NavLink to="/home" className={({ isActive }) => (isActive ? 'p-3 nav-link active' : 'p-3 nav-link')}>
                    <HouseDoorFill className='ml-4 mb-1' />
                    {' '}
                    Home
                  </NavLink>
                </Nav.Item>
                <Nav.Item className='p-3 py-md-1'>
                  <NavLink to="/categories" className={({ isActive }) => (isActive ? 'p-3 nav-link active' : 'p-3 nav-link')}>
                    <BookmarkStarFill className='ml-4 mb-1' />
                    {' '}
                    Categories
                  </NavLink>
                </Nav.Item>
                <Nav.Item className='p-3 py-md-1'>
                  <NavLink to="/products" className={({ isActive }) => (isActive ? 'p-3 nav-link active' : 'p-3 nav-link')}>
                    <TagsFill className='ml-4 mb-1' />
                    {' '}
                    Products
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container fluid className='p-4 shadow-lg bg-body-tertiary rounded mt-4'>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      </Container>
      <footer className='footer mt-auto py-3 shadow'>
        <Container className='text-center'>
          <span className='text-muted'>
            © 2024 <a href="https://github.com/rodrigoarq14" target="_blank">rodrigoarq14</a>
          </span>
        </Container>
      </footer>
    </React.StrictMode>
  </BrowserRouter>,
)
