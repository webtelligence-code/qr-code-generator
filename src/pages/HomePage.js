import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import CustomTable from '../components/CustomTable';

const HomePage = ({ users, sessionDepartment, API_URL }) => {
  const [activeFilter, setActiveFilter] = useState('DEPARTAMENTO');
  const [groupedUsers, setGroupedUsers] = useState([]);

  useEffect(() => {
    if (activeFilter === 'ALL') {
      document.title = 'Todos os utilizadores';
      setGroupedUsers(users);
    } else {
      const filteredUsers = users.filter((user) => user.DEPARTAMENTO === sessionDepartment);

      const newGroupedUsers = filteredUsers.reduce((acc, user) => {
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

      setGroupedUsers(orderedGroupedUsers);
    }
  }, [activeFilter, sessionDepartment, users]);

  return (
    <Container fluid>
      <CustomNavbar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sessionDepartment={sessionDepartment}
      />
      <CustomTable users={groupedUsers} activeFilter={activeFilter} qrCodeSize={100} />
    </Container>
  );
};

export default HomePage;
