import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CustomNavbar from '../components/CustomNavbar'
import CustomTable from '../components/CustomTable'

const HomePage = ({ users, API_URL }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeFilterChild, setActiveFilterChild] = useState('NONE');
  const [allGroupedUsers, setAllGroupedUsers] = useState(users);  // Store all options
  const [groupedUsers, setGroupedUsers] = useState(users);  // Store filtered results

  useEffect(() => {
    if (activeFilter === 'ALL') {
      document.title = 'Todos os utilizadores'
      setAllGroupedUsers(users);
      setGroupedUsers(users);
    } else {
      const newGroupedUsers = users.reduce((acc, user) => {
        const key = user[activeFilter];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(user);
        return acc;
      }, {});

      const orderedKeys = Object.keys(newGroupedUsers).sort();
      const orderedGroupedUsers = orderedKeys.reduce((acc, key) => {
        acc[key] = newGroupedUsers[key];
        return acc;
      }, {});

      setAllGroupedUsers(orderedGroupedUsers);
      setGroupedUsers(orderedGroupedUsers);
    }
  }, [activeFilter, users])

  useEffect(() => {
    if (activeFilterChild !== 'NONE') {
      setGroupedUsers(prevGroupedUsers => {
        return Object.keys(prevGroupedUsers)
          .filter(key => key === activeFilterChild)
          .reduce((obj, key) => {
            obj[key] = prevGroupedUsers[key];
            return obj;
          }, {});
      });
    } else {
      setGroupedUsers(allGroupedUsers);
    }
  }, [activeFilterChild, allGroupedUsers]);

  return (
    <Container fluid>
      <CustomNavbar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeFilterChild={activeFilterChild}
        setActiveFilterChild={setActiveFilterChild}
        filteredKeys={Object.keys(allGroupedUsers)}
      />
      <CustomTable users={groupedUsers} activeFilter={activeFilter} qrCodeSize={100} />
    </Container>
  )
}


export default HomePage