import './styles/App.css';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBars from './components/utility/LoadingBars';

const API_URL = 'https://webtelligence.pt/api/qr-code-generator/index.php';

function App() {
  const [users, setUsers] = useState([]);
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

  return (loading ? (<LoadingBars />) : (<HomePage users={users} API_URL={API_URL} />));
}

export default App;
