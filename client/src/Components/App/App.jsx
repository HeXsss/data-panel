import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom';
import {
  Redirect
} from 'react-router';
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
  useEffect(() => {
    fetchTokens()
  }, []);
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
        <Route path="/login" element={
          session ? (
            session.accessToken !== null ? <Navigate to="/dashboard/home" /> : <Login onLogin={handleLogin} />
          ) : (<Login onLogin={handleLogin} />)
        } />
        <Route path="/dashboard/:page" element={
          session ? (
            session.accessToken === null ? <Navigate to="/login" /> :  <Dashboard getSession={getSession} />
          ) : ( <Dashboard getSession={getSession} />)
        }/>
        <Route path="*" element={
          <Navigate to="/login" />
        }/>
      </Routes>
    </>
  )
}
export default App;