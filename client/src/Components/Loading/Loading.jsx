import { Component } from 'react';
import { BsFillDiagram3Fill } from 'react-icons/bs';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div id="loading">
        <div id="icon"><BsFillDiagram3Fill/></div>
      </div>
    )
  }
}