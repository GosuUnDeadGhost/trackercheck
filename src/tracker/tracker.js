import React, { Component } from 'react';
import './tracker.css';
import {Env} from '../env.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tracker_id: ''
    }
  }

  handleChange = (e) => this.setState({ tracker_id: e.target.value })

  handleClick = () => {
    console.log(this.state.tracker_id);
    this.getTrackerInfo();
  };
  
  getTrackerInfo() {
    fetch(Env.server.url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  }
  
  render() {
    return (
      <div>
        <input type="text" onChange={ this.handleChange } />
        <button onClick={ this.handleClick }>Найти</button>
        <h3>Трекер: {this.state.tracker_id}</h3>
      </div>
    )
  }
}

export default Tracker;