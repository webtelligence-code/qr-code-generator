import './App.css';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBars from './components/utility/LoadingBars';
import NoAccessWarning from './components/utility/NoAccessWarning';

const API_URL = 'https://webtelligence.pt/api/qr-code-generator/index.php';

function App() {
  const [users, setUsers] = useState([]);
  const [sessionDepartment, setSessionDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDepartment = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_department',
        }
      })
        .then((response) => {
          setSessionDepartment(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch session department variable:', error)
        })
    }

    getDepartment();
  }, [])

  useEffect(() => {
    document.title = 'A carregar utilizadores...';

    const getUsers = () => {
      axios.get(API_URL, {
        params: {
          action: 'get_users',
        }
      })
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
          document.title = 'Utilizadores'
        })
        .catch((error) => {
          console.error('Error fetching users from API:', error)
        })
    }

    getUsers()
  }, [sessionDepartment]);

  return loading ? <LoadingBars /> : sessionDepartment === 'Pós Venda' ? (
    <HomePage users={users} sessionDepartment={sessionDepartment} API_URL={API_URL} />
  ) : (
    <NoAccessWarning sessionDepartment={sessionDepartment} />
  );
}

export default App;
