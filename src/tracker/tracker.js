import React, { Component } from 'react';
import { connect } from 'react-redux';
import './tracker.css';
import TrackerLastData from '../tracker_last_data/tracker_last_data.js';
import {TrackerModel} from './tracker_model.js';
import {Env} from '../env.js';
import { getTrackerInfo, getTrackerLastData } from '../actions/tracks';

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
     //this.getTrackerInfo();
     this.props.onGetTrackerInfo(this.state.tracker_id);
   };

  getTrackerLastData = () => {

    this.props.onGetTrackerLastData(this.state.tracker_id);
  }

  sendRequest = (params) => {
    let {action, cb} = params;
    //fetch(Env.server.url + `?action=${action}&id=${this.state.tracker_id}`, {
    fetch(Env.server.url + `api/trackers/${action}/` + this.state.tracker_id, {
      crossDomain:true,
    })
    .then(response => response.json())
    .then(data => {
      cb(data);
    });
  }


  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12"><input type="text" onChange={this.handleChange} ref={(input) => { this.trackInput = input }} /></div>
          <div className="col-12"><button onClick={this.handleClick}>Найти</button></div>
        </div>
        {
          Object.keys(this.props.tracks).length > 0 &&
          [
            <div className="col-12" key={0}><h3>Трекер: {this.props.tracks.ID}</h3></div>,
            Object.keys(TrackerModel).map((k, i) => {
              let value = this.props.tracks[k];
              return (
                <div className="row" key={i}>
                  <div className="col-6">{TrackerModel[k]}</div>
                  <div className="col-6">{value ? value : "-"}</div>
                </div>
              );
            }),
            <div className="row" key={1}>
              <div className="col-3"><button className="btn btn-primary" onClick={ this.getTrackerLastData }>Посл. данные</button></div>
            </div>
          ]
        }
        <div className="row">
          {Object.keys(this.props.tracker_last_data).length > 0 && <TrackerLastData tracker_last_data={this.props.tracker_last_data} />}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tracks: state.tracks,
    tracker_last_data: state.tracker_last_data
  }),
  dispatch => ({
    onGetTrackerInfo: (id) => {
      dispatch({type: "CLEAR_LAST_DATA"});
      dispatch(getTrackerInfo(id));
    },
    onGetTrackerLastData: (id) => {
      dispatch(getTrackerLastData(id));
    }
  })
)(Tracker);
