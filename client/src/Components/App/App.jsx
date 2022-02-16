import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './App.css';

const App = (props) => {
  const [isLoading, updateLoading] = useState(false);
  const [session, updateSession] = useState(null);
  useEffect(async () => {
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
  });
  const handleLoginError = () => {

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
  let hasToLogin = true
  if (session === null) {
    hasToLogin = false
  } else if (session.accessToken !== null) {
    hasToLogin = false
  }
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
        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
      </Routes>
    </>
  )
}
export default App;