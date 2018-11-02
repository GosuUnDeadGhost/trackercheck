import React, { Component } from 'react';
import './tracker.css';
import TrackerInfo from '../tracker_info/tracker_info.js';
import {TrackerModel} from './tracker_model.js';
import {Env} from '../env.js';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

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
    fetch(Env.server.url + "?action=GetTrBasicInfo&id=" + this.state.tracker_id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({tracker_info: data.Data[0].InfoData[0]});
      });
  }
  
  render() {
    return (
      <div>
        <h3>Трекер: {this.state.tracker_id}</h3>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Найти</button>
        <div>
          {
            this.state.tracker_info ?
              <table className="table">
              <thead>
              </thead>
              <tbody>
                {Object.keys(TrackerModel).map((k, i) => {
                  let value = this.state.tracker_info[k];
                  return (
                    <tr key={i}>
                      <td>{TrackerModel[k]}</td>
                      <td>{value ? value : "-"}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <HashRouter>
                      <div>
                        <ul className="header">
                          <li><NavLink to="/">Полс. данные</NavLink></li>
                          <li><NavLink to="/tracker/tracker_info">Полс. данные</NavLink></li>
                        </ul>
                        <div className="content">
                          <Route path="/" component={TrackerInfo}/>
                          <Route path="/tracker/tracker_info" component={TrackerInfo}/>
                        </div>
                      </div>
                    </HashRouter>
                  </td>
                </tr>
              </tbody>
            </table> : ""
          }
        </div>
      </div>
    )
  }
}

export default Tracker;