import { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: [
        {type: 'text', name: 'login', value: '', label: 'Login'},
        {type: 'password', name: 'password', value: '', label: 'Hasło' },
      ],
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleCookie = this.handleCookie.bind(this)
  }
  handleInput(field, { target }) {
    this.setState((prev) => {
      return {
        formInputs: prev.formInputs.map((e) => {
          if (e.name === field) {
            return {
              ...e,
              value: target.value
            }
          } else {
            return e
          }
        })
      }
    })
  }
  getValue(inputField) {
    for (let i = 0; i < this.state.formInputs.length; i++) {
      if (this.state.formInputs[i].name === inputField) return this.state.formInputs[i].value
    }
  }
  handleLogin() {
    const login = this.getValue('login')
    const password = this.getValue('password')
    this.props.onLogin({
      login,
      password
    })
  }
  async handleCookie() {
    const response = await fetch('http://localhost:4001/api/v1/cookie', {
      credentials: 'include',
    })
  }
  render() {
    return (
      <div id="login">
        <div id="topbar">Logowanie</div>
        {this.state.formInputs.map(e => {
          return (
            <div className="input-field" key={`input_${e.name}`}>
              <input type={e.type} name={e.name} autoComplete='off' required value={e.value} onInput={(target) => {
                this.handleInput(e.name, target)
              }}/>
              <label htmlFor={e.name} required>{e.label}</label>
            </div>
          )
        })}
        <div className="input-submit">
          <input type="button" value="Zaloguj" onClick={this.handleLogin}/>
          <input type="button" value="Cookie" onClick={this.handleCookie}/>
        </div>
      </div>
    )
  }
}