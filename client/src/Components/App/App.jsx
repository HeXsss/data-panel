import { Component } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Loading/Loading';
import './App.css';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      session: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLoginError = this.handleLoginError.bind(this)
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4001/api/v1/getSession', {
        credentials: 'include',
      })
      const data = await response.json()  
      this.setState({ session: data})
    } catch (error) {
      this.setState({ session: {
        accessToken: null,
        refreshToken: null
      }})
      return
    }
  }
  handleLoginError(message) {

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
      if (response.status === 200) {
        const data = await response.json()
        this.setState({ session: data})
      }
      this.setState({isLoading: false})  
    } catch (e) {
      this.handleLoginError()
    }
  }
  render() {
    let hasToLogin = true
    if (this.state.session === null) {
      hasToLogin = false
    } else if (this.state.session.accessToken !== null) {
      hasToLogin = false
    }
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
        {hasToLogin ? <Login onLogin={this.handleLogin}/>: <></>}
      </>
    )
  }
}