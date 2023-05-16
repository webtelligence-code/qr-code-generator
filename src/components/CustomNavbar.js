import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Container, FormControl, Image, Nav, Navbar } from 'react-bootstrap'
import '../styles/CustomNavbar.css'

const CustomNavbar = () => {
  return (
    <Navbar fixed='top' bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>
          <Image src='https://amatoscar.pt/assets/media/general/logoamatoscar.webp' height="40px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className='justify-content-center' id='basic-navbar-nav'>
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Nav className='align-items-center mx-2'>
            <button className='me-1 align-items-center' style={{borderRadius: 5}}>
              Download
              <FontAwesomeIcon className='ms-2' icon={faFilePdf} />
            </button>

            <select className='text-center ms-1'>
              <option value='all'>Todas as concessões</option>
            </select>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar