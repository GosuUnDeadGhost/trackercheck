import React, { Component } from 'react';
import './tracker_info.css';
import {Env} from '../env.js';

class TrackerInfo extends Component {

  constructor(props) {
    super(props);
    this.tracker_info_labels = {"CarID": "Номер авто", "DriverName": "Водитель", "ID": "ID", "MarkerText": "MarkerText", "uuid": "uuid"};
  }
  
  handleClick = () => {
    this.getTrackerLastData();
  };
  
  getTrackerLastData() {
    fetch(Env.server.url + "/api/trackers/lastData/" + this.props.tracker_info.ID)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //this.setState({tracker_info: data[0]});
      });
  }
  
  render() {
    return (
      this.props.tracker_info ?
      <table className="table">
        <thead>
        </thead>
        <tbody>
          {Object.keys(this.props.tracker_info).map((k, i) => {
            let value = this.props.tracker_info[k];
            return (
              <tr key={i}>
                <td>{this.tracker_info_labels[k]}</td>
                <td>{value ? value : "-"}</td>
              </tr>
            );
          })}
          <tr>
            <td><button className="btn btn-primary" onClick={this.handleClick}>Полс. данные</button></td>
            <td></td>
          </tr>
        </tbody>
      </table> : <p>Нет данных</p>
    )
  }
}

export default TrackerInfo;