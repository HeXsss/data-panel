import { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="Login">
        <div id="Topbar">Log in</div>
        <div className="data-field">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" autoComplete='false' spellCheck="false"/>
        </div>
        <div className="data-field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" autoComplete='false'/>
        </div>
      </div>
    )
  }
}