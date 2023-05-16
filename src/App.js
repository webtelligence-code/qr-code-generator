import './styles/App.css';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'A carregar utilizadores...';

    const getUsers = () => {

    }
  }, [])

  return (loading ? (<HomePage />) : (<Warning />));
}

export default App;
