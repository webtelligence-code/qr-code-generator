import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import CustomTable from '../components/CustomTable';

const HomePage = ({ users, sessionDepartment, API_URL }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [groupedUsers, setGroupedUsers] = useState([]);

  useEffect(() => {
    let filteredUsers;

    if (activeFilter === 'ALL') {
      filteredUsers = users
    } else {
      filteredUsers = users.filter((user) => user.FUNCAO === activeFilter);
    }

    const newGroupedUsers = filteredUsers.reduce((acc, user) => {
      const key = user.CONCESSAO;
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

    console.log(orderedGroupedUsers)

    setGroupedUsers(orderedGroupedUsers);
  }, [activeFilter, users]);

  return (
    <Container fluid>
      <CustomNavbar
        setActiveFilter={setActiveFilter}
      />
      <CustomTable users={groupedUsers} activeFilter={activeFilter} qrCodeSize={100} />
    </Container>
  );
};

export default HomePage;
