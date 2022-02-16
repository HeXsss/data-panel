import { useState } from 'react';
import './Login.css';

const Login = (props) => {
  let inputFields = [
    {type: 'text', name: 'login', value: '', label: 'Login'},
    {type: 'password', name: 'password', value: '', label: 'Hasło' },
  ]
  const [inputData, updateInputData] = useState(inputFields)
  const handleInput = (name, { target }) => {
    const updatedInputs = inputData.map(e => {
      if (e.name === name) {
        return {
          ...e,
          value: target.value
        }
      } else {
        return e
      }
    })
    updateInputData(updatedInputs)
  }
  const getValue = (inputField) => {
    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i].name === inputField) return inputData[i].value
    }
  } 
  const handleLogin = () => {
    const login = getValue('login')
    const password = getValue('password')
    props.onLogin({
      login,
      password
    })
  }
  const handleCookie = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/v1/cookie', {
        credentials: 'include',
      })  
    } catch (e) {
      return
    }
  }
  return (
    <div id="login">
      <div id="topbar">Logowanie</div>
      {inputData.map(e => {
        return (
          <div className="input-field" key={`input_${e.name}`}>
            <input type={e.type} name={e.name} autoComplete='off' required value={e.value} onInput={(target) => {
              handleInput(e.name, target)
            }}/>
            <label htmlFor={e.name} required>{e.label}</label>
          </div>
        )
      })}
      <div className="input-submit">
        <input type="button" value="Zaloguj" onClick={handleLogin}/>
        <input type="button" value="Cookie" onClick={handleCookie}/>
      </div>
    </div>
  )
}

export default Login;