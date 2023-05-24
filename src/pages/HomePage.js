import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import CustomTable from '../components/CustomTable';

const HomePage = ({ users, currentUser, sessionData, concessions, API_URL }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeConcession, setActiveConcession] = useState('ALL');
  const [groupedUsers, setGroupedUsers] = useState([]);

  console.log('Users Home Page:', users);

  useEffect(() => {
    let filteredUsers;

    if (activeFilter === 'ALL') {
      filteredUsers = users;
    } else {
      filteredUsers = users.filter((user) => user.FUNCAO === activeFilter);
    }

    if (activeConcession !== 'ALL') {
      filteredUsers = filteredUsers.filter((user) => user.CONCESSAO === activeConcession);
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

    setGroupedUsers(orderedGroupedUsers);
  }, [activeFilter, activeConcession, users]);

  const showUserManual = () => {
    window.open(process.env.PUBLIC_URL + '/assets/manual/Manual-Portal-QRCode.pdf');
  }

  return (
    <Container fluid>
      <CustomNavbar
        currentUser={currentUser}
        sessionData={sessionData}
        setActiveFilter={setActiveFilter}
        setActiveConcession={setActiveConcession}
        concessions={concessions}
        showUserManual={showUserManual}
      />
      <CustomTable users={groupedUsers} activeFilter={activeFilter} qrCodeSize={100} />
    </Container>
  );
};

export default HomePage;
