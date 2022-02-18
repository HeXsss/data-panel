import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';

const App = (props) => {
  const [isLoading, updateLoading] = useState(false);
  const [session, updateSession] = useState(null);
  const navigate = useNavigate();
  const fetchTokens = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/v1/getSession', {
        credentials: 'include',
      })
      const data = await response.json()  
      updateSession(data)
    } catch (error) {
      updateSession({
        accessToken: null,
        refreshToken: null
      })
    }
  }
  const loadSessionRoute = async () => {
    if (session) {
      const path = window.location.pathname
      if (session.accessToken) {
        if (path === '/login') navigate("/dashboard/home")
      } else {
        if (path !== '/login') navigate("/login")
      }
    }
  }
  useEffect(() => {
    fetchTokens()
  }, []);
  useEffect(() => {
    loadSessionRoute()
  }, [session])
  const handleLoginError = (msg) => {
    console.log(msg)
  }
  const handleLogin = async ({ login, password }) => {
    updateLoading(true)
    try {
      const response = await fetch('http://localhost:4001/api/v1/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login,
          password
        })
      })
      if (response.status === 200) {
        const data = await response.json()
        updateSession(data)
      }
      updateLoading(false)
    } catch (e) {
      handleLoginError()
    }
  }
  const getSession = () => (session)
  return (
    <>    
      <CSSTransition
        in={isLoading}
        unmountOnExit
        timeout={500}
        classNames="load"
      >  
        <Loading/>
      </CSSTransition>
      <Routes>
        <Route exact index path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard/:page" element={<Dashboard getSession={getSession}/>}/>
        <Route path='*' exact={true} element={<Error code={404} msg={"Nie znaleziono strony"}/>} />
      </Routes>
    </>
  )
}
export default App;