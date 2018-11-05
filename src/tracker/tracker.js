import React, { Component } from 'react';
import './tracker.css';
import TrackerLastData from '../tracker_last_data/tracker_last_data.js';
import {TrackerModel} from './tracker_model.js';
import {Env} from '../env.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tracker_id: '',
      tracker_info: '',
      tracker_last_data: '',
      show_last_data: false,
    }
  }

  handleChange = (e) => this.setState({ tracker_id: e.target.value })

  handleClick = () => {
    this.getTrackerInfo();
  };
  
  getTrackerInfo() {
    fetch(Env.server.url + "?action=GetTrBasicInfo&id=" + this.state.tracker_id)
      .then(response => response.json())
      .then(data => {
        this.setState({tracker_info: data.Data[0].InfoData[0]});
      });
  }
  
  getTrackerLastData = () => {
    fetch(Env.server.url + "?action=GetTrAllLastData&id=" + this.state.tracker_info.ID)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({tracker_last_data: data.Data[0]});
      });
  }
  
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12"><h3>Трекер: {this.state.tracker_id}</h3></div>
            <div className="col-12"><input type="text" onChange={this.handleChange} /></div>
            <div className="col-12"><button onClick={this.handleClick}>Найти</button></div>
          </div>
          {
            this.state.tracker_info ? 
              [
                Object.keys(TrackerModel).map((k, i) => {
                  let value = this.state.tracker_info[k];
                  return (
                    <div className="row" key={i}>
                      <div className="col-6">{TrackerModel[k]}</div>
                      <div className="col-6">{value ? value : "-"}</div>
                    </div>
                  );
                }),
                <div className="row" key={0}>
                  <div className="col-3"><button className="btn btn-primary" onClick={this.getTrackerLastData}>Полс. данные</button></div>
                </div>
              ] : ""
          }
          {
            <div className="row">
              <div className="col-12">
                {
                  this.state.tracker_last_data ? 
                    <TrackerLastData tracker_last_data={this.state.tracker_last_data}/> : ""
                }
              </div>
            </div>
          }
        </div>
    )
  }
}

export default Tracker;