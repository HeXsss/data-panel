import { Component } from 'react';
import Login from '../Login/Login';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <>
        <Login/>
      </>
    )
  }
}