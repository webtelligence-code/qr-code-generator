import { faBolt, faBook, faBookOpen, faBuilding, faBuildingUser, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'antd';
import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ activeFilter, setActiveFilter }) => {

  const handleItemFilterClick = (item) => {
    setActiveFilter(item)
  }

  const firstSelectOptions = [
    { value: 'CONCESSAO', label: <label>Por Concessão <FontAwesomeIcon className='ms-2' icon={faCity} /></label> },
    { value: 'FUNCAO', label: <label>Por Função <FontAwesomeIcon className='ms-2' icon={faBolt} /></label> },
    { value: 'EMPRESA', label: <label>Por Empresa <FontAwesomeIcon className='ms-2' icon={faBuilding} /></label> },
    { value: 'DEPARTAMENTO', label: <label>Por Departamento <FontAwesomeIcon className='ms-2' icon={faBuildingUser} /></label> }
  ];

  return (
    <Navbar sticky='top' expand='sm' style={{ backgroundColor: 'white' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className='justify-content-start' id='basic-navbar-nav'>
          <Nav className='text-center'>

            <Tooltip title="Manual de utilizador">
              <button
                className='user-manual-button'
                style={{ marginLeft: -10, marginRight: 10 }}
              >
                <FontAwesomeIcon icon={faBookOpen} />
              </button>
            </Tooltip>

            {/* Select by Concessão, Departamento, Função, Empresa */}
            <Select
              onChange={(e) => handleItemFilterClick(e !== null ? e.value : 'ALL')}
              value={activeFilter === 'ALL' ? null : firstSelectOptions[3]}
              placeholder='Filtrar tabelas'
              className='select-filter'
              isClearable={true}
              name="filtro"
              options={firstSelectOptions}
            />
          </Nav>

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default CustomNavbar