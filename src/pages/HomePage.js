import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CustomNavbar from '../components/CustomNavbar'
import CustomTable from '../components/CustomTable'
import LoadingBars from '../components/utility/LoadingBars'

const HomePage = ({ users, API_URL }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [groupedUsers, setGroupedUsers] = useState(users);

  useEffect(() => {
    setGroupedUsers([])
    if (activeFilter === 'ALL') {
      document.title = 'Todos os utilizadores'
      setGroupedUsers(users);
    } else {
      const newGroupedUsers = users.reduce((acc, user) => {
        const key = user[activeFilter];
        if(!acc[key]) {
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

      setGroupedUsers(orderedGroupedUsers);
    }
  }, [activeFilter, users])

  useEffect(() => {
    console.log('Grouped Users:', groupedUsers)
  }, [groupedUsers])

  return (
    <Container fluid>
      <CustomNavbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <CustomTable users={groupedUsers} activeFilter={activeFilter} qrCodeSize={100} />
    </Container>
  )
}

export default HomePage