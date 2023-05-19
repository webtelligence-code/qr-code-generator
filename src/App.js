import './App.css';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBars from './components/utility/LoadingBars';

const API_URL = 'https://webtelligence.pt/api/qr-code-generator/index.php';

function App() {
  const [users, setUsers] = useState([]);
  const [sessionDepartment, setSessionDepartment] = useState('');
  const [loading, setLoading] = useState(true);

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
  }, []);

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
    if (sessionDepartment) console.log('Session Department:', sessionDepartment);
  }, [sessionDepartment])

  return (loading ? (<LoadingBars />) : (<HomePage users={users} sessionDepartment={sessionDepartment} API_URL={API_URL} />));
}

export default App;
