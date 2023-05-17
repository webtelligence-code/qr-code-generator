import { faBolt, faBuilding, faFilePdf, faFilter, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Container, Dropdown, FormControl, Image, Nav, Navbar } from 'react-bootstrap'
import '../styles/CustomNavbar.css'

const CustomNavbar = ({ activeFilter, setActiveFilter }) => {
  const [dropdownLabel, setDropdownLabel] = useState('Filtrar')
  const [dropdownIcon, setDropdownIcon] = useState(faFilter);

  const handleItemClick = (item) => {
    setActiveFilter(item)
    switch (item) {
      case 'ALL':
        document.title = 'Todos os utilizadores'
        setDropdownLabel('Filtrar')
        setDropdownIcon(faFilter)
        break;
      case 'CONCESSAO':
        document.title = 'Filtrar por concessão'
        setDropdownLabel('Por concessão')
        setDropdownIcon(faBuilding)
        break;
      case 'FUNCAO':
        document.title = 'Filtrar por função'
        document.
        setDropdownLabel('Por função')
        setDropdownIcon(faBolt)
        break;
      default:
        return;
    }
  }
  return (
    <Navbar sticky='top' expand='sm' style={{backgroundColor: 'white'}}>
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
            <button className='me-1 align-items-center' style={{ borderRadius: 5 }}>
              Download
              <FontAwesomeIcon className='ms-2' icon={faFilePdf} />
            </button>

            <Dropdown>
              <Dropdown.Toggle>
                {dropdownLabel}
                <FontAwesomeIcon className='ms-2' icon={dropdownIcon} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item active={activeFilter === 'CONCESSAO'} onClick={() => handleItemClick('CONCESSAO')}>
                  Por Concessão
                  <FontAwesomeIcon className='ms-2' icon={faBuilding} />
                </Dropdown.Item>
                <Dropdown.Item active={activeFilter === 'FUNCAO'} onClick={() => handleItemClick('FUNCAO')}>
                  Por Função
                  <FontAwesomeIcon className='ms-2' icon={faBolt} />
                </Dropdown.Item>
                {activeFilter !== 'ALL' && (
                  <Fragment>
                    <Dropdown.Divider />
                    <button onClick={() => handleItemClick('ALL')}>
                      Limpar filtros
                      <FontAwesomeIcon className='ms-2' icon={faTrash} />
                    </button>
                  </Fragment>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar