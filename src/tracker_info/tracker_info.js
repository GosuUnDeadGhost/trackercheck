import React, { Component } from 'react';
import './tracker_info.css';
import {TrackerInfoModel} from './tracker_info_model.js';
import {Env} from '../env.js';

class TrackerInfo extends Component {

  constructor(props) {
    super(props);
  }
  
  handleClick = () => {
    this.getTrackerLastData();
  };
  
  getTrackerLastData() {
    fetch(Env.server.url + "?action=GetTrAllLastData&id=" + this.props.tracker_info.ID)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({tracker_last_data: data.Data[0]});
      });
  }
  
  render() {
    return (
      this.props.tracker_info ?
      <table className="table">
        <thead>
        </thead>
        <tbody>
          {Object.keys(TrackerInfoModel).map((k, i) => {
            let value = this.props.tracker_info[k];
            return (
              <tr key={i}>
                <td>{TrackerInfoModel[k]}</td>
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