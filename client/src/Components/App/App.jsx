import { Component } from 'react';
import Login from '../Login/Login';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Loading/Loading';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  async handleLogin({ login, password }) {
    console.log('start')
    this.setState({isLoading: true})
    setTimeout(() => {
      console.log('stop')
      this.setState({isLoading: false})
    }, 1000);
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
        <Login onLogin={this.handleLogin}/>
      </>
    )
  }
}