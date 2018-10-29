import React, { Component } from 'react';
import './tracker.css';
import TrackerInfo from '../tracker_info/tracker_info.js';
import {Env} from '../env.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tracker_id: '',
      tracker_info: ''
    }
  }

  handleChange = (e) => this.setState({ tracker_id: e.target.value })

  handleClick = () => {
    console.log(this.state.tracker_id);
    this.getTrackerInfo();
  };
  
  getTrackerInfo() {
    fetch(Env.server.url + "/api/trackers/info/" + this.state.tracker_id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({tracker_info: data[0]});
      });
  }
  
  render() {
    return (
      <div>
        <h3>Трекер: {this.state.tracker_id}</h3>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Найти</button>
        <TrackerInfo tracker_info={this.state.tracker_info}/>
      </div>
    )
  }
}

export default Tracker;