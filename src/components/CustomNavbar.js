import { faBolt, faBuilding, faBuildingUser, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';

const CustomNavbar = ({ activeFilter, setActiveFilter, activeFilterChild, setActiveFilterChild, activeFilterChild2, setActiveFilterChild2, filteredKeys }) => {
  const [dropdownFilterChildLabel, setDropdownFilterChildLabel] = useState('Escolha um filtro');
  const [isSelectedFilterChild, setIsSelectedFilterChild] = useState(false);
  const [isSelectedFilterChild2, setIsSelectedFilterChild2] = useState(false);

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

  const handleItemFilterChild2Click = (item) => {
    setActiveFilterChild2(item)
    if (item !== 'NONE') {
      setIsSelectedFilterChild2(true)
    } else {
      setIsSelectedFilterChild2(false)
    }
  }

  return (
    <Navbar sticky='top' expand='sm' style={{ backgroundColor: 'white' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className='justify-content-start' id='basic-navbar-nav'>
          <Nav className='text-center'>

            {/* Select by Concessão, Departamento, Função, Empresa */}
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

            {/* Select by keys from parent filter */}
            {activeFilter !== 'ALL' && (
              <Select
                isDisabled={isSelectedFilterChild2}
                onChange={(e) => handleItemFilterChildClick(e !== null ? e.value : 'NONE')}
                placeholder={dropdownFilterChildLabel}
                className='select-filter ms-2'
                isClearable={true}
                name="filtro"
                options={filteredKeys.map(key => ({ value: key, label: key }))}
              />
            )}

            {/* Here i want to add a condition that if teh active filter === CONCESSAO then it will render all FUNÇAO options present in the CONCESSION selected */}
            {activeFilterChild !== 'NONE' && (
              <Select
                onChange={(e) => handleItemFilterChild2Click(e !== null ? e.value : 'NONE')}
                placeholder={dropdownFilterChildLabel}
                className='select-filter ms-2'
                isClearable={true}
                name="filtro"
                options={filteredKeys.map(key => ({ value: key, label: key }))}
              />
            )}
          </Nav>

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default CustomNavbar