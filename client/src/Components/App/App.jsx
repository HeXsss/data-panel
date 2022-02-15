import { Component } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Loading/Loading';
import './App.css';
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
      const data = await response.json()
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