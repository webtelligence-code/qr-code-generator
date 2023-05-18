import { faBolt, faBuilding, faBuildingUser, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Container, FormControl, Image, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ activeFilter, setActiveFilter, setActiveFilterChild, filteredKeys }) => {
  const [dropdownFilterChildLabel, setDropdownFilterChildLabel] = useState('Escolha um filtro');
  const [isSelectedFilterChild, setIsSelectedFilterChild] = useState(false);

  const handleItemFilterClick = (item) => {
    setActiveFilter(item)
    switch (item) {
      case 'ALL':
        document.title = 'Todos os utilizadores'
        setDropdownFilterChildLabel('Escolha um filtro')
        break;
      case 'CONCESSAO':
        document.title = 'Filtrar por concessão'
        setDropdownFilterChildLabel(<label>Escolher Concessão <FontAwesomeIcon className='ms-2' icon={faCity} /></label>)
        break;
      case 'FUNCAO':
        document.title = 'Filtrar por função';
        setDropdownFilterChildLabel(<label>Escolher função <FontAwesomeIcon className='ms-2' icon={faCity} /></label>)
        break;
      case 'EMPRESA':
        document.title = 'Filtrar por empresa';
        setDropdownFilterChildLabel(<label>Escolher empresa <FontAwesomeIcon className='ms-2' icon={faCity} /></label>)
        break;
      case 'DEPARTAMENTO':
        document.title = 'Filtrar por departamento';
        setDropdownFilterChildLabel(<label>Escolher departamento <FontAwesomeIcon className='ms-2' icon={faCity} /></label>)
        break;
      default:
        return;
    }
  }

  const handleItemFilterChildClick = (item) => {
    setActiveFilterChild(item)
    if (item !== 'NONE') {
      setIsSelectedFilterChild(true)
    } else {
      setIsSelectedFilterChild(false)
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
              onChange={(e) => handleItemFilterClick(e !== null ? e.value : 'ALL')}
              isDisabled={isSelectedFilterChild}
              placeholder='Filtrar tabelas'
              className='select-filter'
              isClearable={true}
              name="filtro"
              options={[
                { value: 'CONCESSAO', label: <label>Por Concessão <FontAwesomeIcon className='ms-2' icon={faCity} /></label> },
                { value: 'FUNCAO', label: <label>Por Função <FontAwesomeIcon className='ms-2' icon={faBolt} /></label> },
                { value: 'EMPRESA', label: <label>Por Empresa <FontAwesomeIcon className='ms-2' icon={faBuilding} /></label> },
                { value: 'DEPARTAMENTO', label: <label>Por Departamento <FontAwesomeIcon className='ms-2' icon={faBuildingUser} /></label> }
              ]}
            />

            <Select
              onChange={(e) => handleItemFilterChildClick(e !== null ? e.value : 'NONE')}
              isDisabled={activeFilter === 'ALL'}
              placeholder={dropdownFilterChildLabel}
              className='select-filter'
              isClearable={true}
              name="filtro"
              options={filteredKeys.map(key => ({ value: key, label: key }))}
            />
          </Nav>

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default CustomNavbar