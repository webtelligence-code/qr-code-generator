import { faBolt, faBookOpen, faDroplet, faHammer, faPaintRoller, faScrewdriverWrench, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'antd';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ setActiveFilter }) => {

  const handleItemFilterClick = (item) => {
    setActiveFilter(item)
  }

  const firstSelectOptions = [
    { value: 'Pintor', label: <label>Pintor<FontAwesomeIcon className='ms-2' icon={faPaintRoller} /></label> },
    { value: 'Lavador', label: <label>Lavador<FontAwesomeIcon className='ms-2' icon={faDroplet} /></label> },
    { value: 'Mecânico', label: <label>Mecânico<FontAwesomeIcon className='ms-2' icon={faWrench} /></label> },
    { value: 'Bate Chapas', label: <label>Bate Chapas<FontAwesomeIcon className='ms-2' icon={faHammer} /></label> },
    { value: 'Chefe de Oficina', label: <label>Chefe de Oficina<FontAwesomeIcon className='ms-2' icon={faScrewdriverWrench} /></label> }
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
              placeholder={<label>Filtrar função<FontAwesomeIcon className='ms-2' icon={faBolt} /></label>}
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