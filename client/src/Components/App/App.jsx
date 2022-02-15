import { Component } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Loading/Loading';
import './App.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const createCookie = (key, value) => {
  cookies.set(key, value, { sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 30 * 1000), httpOnly: true})
  console.log(cookies.get(key))
}

let Session = {
  accessToken: null,
  refreshToken: null
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  async handleLogin({ login, password }) {
    this.setState({ isLoading: true })
    try {
      const response = await fetch('http://localhost:4001/api/v1/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login,
          password
        })
      })
      const data = await response.json()
      createCookie('session', data)
      this.setState({isLoading: false})  
    } catch (e) {
      throw new Error(e.message)
    }
  }
  render() {
    return (
      <>
        <CSSTransition
          in={this.state.isLoading}
          unmountOnExit
          timeout={500}
          classNames="load"
        >  
          <Loading/>
        </CSSTransition>
        {Session.accessToken === null ? <Login onLogin={this.handleLogin}/>: <></>}
      </>
    )
  }
}