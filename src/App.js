import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBars from './components/utility/LoadingBars';
import NoAccessWarning from './components/utility/NoAccessWarning';

const API_URL = 'https://webtelligence.pt/api/qr-code-generator/index.php';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [concessions, setConcessions] = useState([]);
  const [salesBossConcessions, setSalesBossConcessions] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userHasAccess, setUserHasAccess] = useState(false);

  useEffect(() => {
    const getDepartment = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_session_data',
        }
      })
        .then((response) => {
          setSessionData(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch session department variable:', error)
        })
    }

    getDepartment();
  }, []);

  useEffect(() => {
    const getCurrentUser = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_current_user',
          username: sessionData.USERNAME
        }
      })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch session department variable:', error)
        })
    }

    getCurrentUser();
  }, [sessionData.USERNAME]);

  useEffect(() => {
    const getSalesBossConcessions = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_sales_boss_concessions',
          username: sessionData.USERNAME
        }
      })
        .then((response) => {
          setSalesBossConcessions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users from API:', error)
        })
    }

    getSalesBossConcessions()
  }, [currentUser, sessionData.USERNAME]);

  useEffect(() => {
    document.title = 'A carregar utilizadores...';

    const getUsers = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_users',
          concessions: salesBossConcessions
        }
      })
        .then((response) => {
          setUsers(response.data);
          setConcessions(Array.from(new Set(response.data.map(user => user.CONCESSAO))))
          setLoading(false);
          document.title = 'Utilizadores'
        })
        .catch((error) => {
          console.error('Error fetching users from API:', error)
        })
    }

    getUsers()
  }, [salesBossConcessions]);

  useEffect(() => {
    if (currentUser) console.log('Current User:', currentUser)
  }, [currentUser])

  useEffect(() => {
    setUserHasAccess(
      sessionData.USERNAME === 'pedromatos@AM098' ||
      sessionData.DEPARTAMENTO === 'Informática' ||
      sessionData.FUNCAO === 'Diretor de Pós Venda' ||
      sessionData.FUNCAO === 'Gerente Pós Venda' ||
      sessionData.FUNCAO === 'Gerente Concessão'
    );
  }, [salesBossConcessions, sessionData])

  return loading ? <LoadingBars /> : userHasAccess ? (
    <HomePage
      users={users}
      currentUser={currentUser}
      concessions={concessions}
      sessionData={sessionData}
      API_URL={API_URL}
    />
  ) : (
    <NoAccessWarning sessionData={sessionData} />
  );
}

export default App;
