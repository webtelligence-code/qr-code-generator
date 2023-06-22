import { faBolt, faBookOpen, faBuilding, faDroplet, faHammer, faPaintRoller, faScrewdriverWrench, faUser, faUserShield, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'antd';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ currentUser, sessionData, setActiveFilter, setActiveConcession, concessions, showUserManual }) => {

  const handleConcessionFilterClick = (selectedOption) => {
    if (selectedOption) {
      setActiveConcession(selectedOption.value);
    } else {
      setActiveConcession('ALL');
    }
  };

  const handleItemFilterClick = (item) => {
    setActiveFilter(item)
  }

  const firstSelectOptions = concessions.map((key) => ({
    value: key,
    label: <label key={key}>{key} <FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>
  }))

  const secondSelectOptions = [
    { value: 'Pintor', label: <label>Pintor<FontAwesomeIcon className='ms-2' icon={faPaintRoller} /></label> },
    { value: 'Lavador', label: <label>Lavador<FontAwesomeIcon className='ms-2' icon={faDroplet} /></label> },
    { value: 'Mecânico', label: <label>Mecânico<FontAwesomeIcon className='ms-2' icon={faWrench} /></label> },
    { value: 'Bate Chapas', label: <label>Bate Chapas<FontAwesomeIcon className='ms-2' icon={faHammer} /></label> },
    { value: 'Chefe de Oficina', label: <label>Chefe de Oficina<FontAwesomeIcon className='ms-2' icon={faScrewdriverWrench} /></label> }
  ];

  return (
    <Navbar sticky='top' expand='xl' style={{ backgroundColor: 'white' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse  className='justify-content-start' id='basic-navbar-nav'>
          <Nav className='text-center'>

            <Tooltip title="Manual de utilizador">
              <button
                onClick={showUserManual}
                className='user-manual-button me-2 align-self-center mb-1'
                style={{ marginLeft: -10, marginRight: 10, width: 40, height: 40 }}
              >
                <FontAwesomeIcon icon={faBookOpen} />
              </button>
            </Tooltip>

            <Select
              onChange={handleConcessionFilterClick}
              placeholder={<label>Filtrar concessão<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
              className='select-filter align-self-center me-2 mb-1'
              isClearable={true}
              name="filtro"
              options={firstSelectOptions}
            />

            <Select
              onChange={(e) => handleItemFilterClick(e !== null ? e.value : 'ALL')}
              placeholder={<label>Filtrar função<FontAwesomeIcon className='ms-2' icon={faBolt} /></label>}
              className='select-filter align-self-center me-2 mb-1'
              isClearable={true}
              name="filtro"
              options={secondSelectOptions}
            />

            {currentUser && (
              <div className='align-self-center ms-2 user-label mb-1'>
                A aceder como:
                <FontAwesomeIcon className='mx-2' icon={sessionData.USERNAME === 'pedromatos@AM098' ? faUserShield : faUser} />
                {currentUser.nameDisplay} ({currentUser.funcao})
              </div>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default CustomNavbar