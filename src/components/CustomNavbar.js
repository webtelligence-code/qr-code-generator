import { faBolt, faBuilding, faBuildingUser, faCity, faFilePdf, faFilter, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Container, Dropdown, FormControl, Image, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ activeFilter, setActiveFilter, activeFilterChild, setActiveFilterChild, filteredKeys }) => {
  const [dropdownFilterLabel, setDropdownFilterLabel] = useState('')
  const [dropdownFilterIcon, setDropdownFilterIcon] = useState(faFilter);
  const [dropdownFilterChildLabel, setDropdownFilterChildLabel] = useState('');
  const [dropdownFilterChildIcon, setDropdownFilterChildIcon] = useState(faFilter);

  const handleItemFilterClick = (item) => {
    setActiveFilter(item)
    switch (item) {
      case 'ALL':
        document.title = 'Todos os utilizadores'
        setDropdownFilterLabel('')
        setDropdownFilterIcon(faFilter)
        break;
      case 'CONCESSAO':
        document.title = 'Filtrar por concessão'
        setDropdownFilterLabel('Por concessão')
        setDropdownFilterIcon(faCity)
        break;
      case 'FUNCAO':
        document.title = 'Filtrar por função';
        setDropdownFilterLabel('Por função')
        setDropdownFilterIcon(faBolt)
        break;
      case 'EMPRESA':
        document.title = 'Filtrar por empresa';
        setDropdownFilterLabel('Por empresa');
        setDropdownFilterIcon(faBuilding)
        break;
      case 'DEPARTAMENTO':
        document.title = 'Filtrar por departamento';
        setDropdownFilterLabel('Por departamento');
        setDropdownFilterIcon(faBuilding)
        break;
      default:
        return;
    }
  }

  const handleItemFilterChildClick = (item) => {
    setActiveFilter(item)
    switch (item) {
      case 'ALL':
        document.title = 'Todos os utilizadores'
        setDropdownFilterLabel('')
        setDropdownFilterIcon(faFilter)
        break;
      case 'CONCESSAO':
        document.title = 'Filtrar por concessão'
        setDropdownFilterLabel('Por concessão')
        setDropdownFilterIcon(faCity)
        break;
      case 'FUNCAO':
        document.title = 'Filtrar por função';
        setDropdownFilterLabel('Por função')
        setDropdownFilterIcon(faBolt)
        break;
      case 'EMPRESA':
        document.title = 'Filtrar por empresa';
        setDropdownFilterLabel('Por empresa');
        setDropdownFilterIcon(faBuilding)
        break;
      case 'DEPARTAMENTO':
        document.title = 'Filtrar por departamento';
        setDropdownFilterLabel('Por departamento');
        setDropdownFilterIcon(faBuilding)
        break;
      default:
        return;
    }
  }


  return (
    <Navbar sticky='top' expand='sm' style={{ backgroundColor: 'white' }}>
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

            <Select
              onChange={(e) => setActiveFilter(e !== null ? e.value : 'ALL')}
              on
              placeholder='Filtrar tabelas'
              className='select-filter'
              defaultValue={''}
              isClearable={true}
              name="filtro"
              options={[
                { value: 'CONCESSAO', label: <label>Por Concessão <FontAwesomeIcon className='ms-2' icon={faCity} /></label> },
                { value: 'FUNCAO', label: <label>Por Função <FontAwesomeIcon className='ms-2' icon={faBolt} /></label> },
                { value: 'EMPRESA', label: <label>Por Empresa <FontAwesomeIcon className='ms-2' icon={faBuilding} /></label> },
                { value: 'DEPARTAMENTO', label: <label>Por Departamento <FontAwesomeIcon className='ms-2' icon={faBuildingUser} /></label> }
              ]}
            />

            <Dropdown >
              <Dropdown.Toggle disabled={activeFilter === 'ALL'} className='filter-child-button' style={{ backgroundColor: '#c62828', border: 'none' }}>
                {dropdownFilterChildLabel}
                <FontAwesomeIcon className='ms-2' icon={dropdownFilterChildIcon} />
              </Dropdown.Toggle>

              <Dropdown.Menu>

                {filteredKeys.map(key => (
                  <Dropdown.Item
                    active={dropdownFilterChildLabel === key}
                    onClick={() => handleItemFilterChildClick}>
                    {key}
                    <FontAwesomeIcon className='ms-2' icon={faCity} />
                  </Dropdown.Item>
                ))}
                {activeFilter !== 'ALL' && (
                  <Fragment>
                    <Dropdown.Divider />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <button className='dropdown-filter-button' onClick={() => handleItemFilterChildClick('ALL')}>
                        Limpar filtros
                        <FontAwesomeIcon className='ms-2' icon={faTrash} />
                      </button>
                    </div>
                  </Fragment>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default CustomNavbar