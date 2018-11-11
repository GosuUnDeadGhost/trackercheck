import React, { Component } from 'react';
import { connect } from 'react-redux';
import './tracker.css';
import TrackerLastData from '../tracker_last_data/tracker_last_data.js';
import {TrackerModel} from './tracker_model.js';
import { getTrackerInfo, getTrackerLastData } from '../actions/tracks';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracker_id: this.props.tracks_info ? this.props.tracks_info.ID : '',
    }
    //console.log(this.state, this.props);
  }

  handleChange = (e) => this.setState({ tracker_id: e.target.value })

   handleClick = () => {
     this.props.onGetTrackerInfo(this.trackInput.value);
   };

  getTrackerLastData = () => {
    this.props.onGetTrackerLastData(this.props.tracks_info.ID);
  }

  render() {
    return (
      <div className="container">
        <BlockUi tag="div" blocking={this.props.tracks_loading || this.props.tracker_last_data_loading}>
          <div className="row">
            <div className="col-12"><input type="text" value={this.state.tracker_id } onChange={this.handleChange} ref={(input) => { this.trackInput = input }} /></div>
            <div className="col-12"><button onClick={this.handleClick}>Найти</button></div>
          </div>
        </BlockUi>
        <BlockUi tag="div" blocking={this.props.tracker_last_data_loading}>
        {
          this.props.tracks_info && Object.keys(this.props.tracks_info).length > 0 &&
          [
            <div className="col-12" key={0}><h3>Трекер: {this.props.tracks_info.ID}</h3></div>,
            Object.keys(TrackerModel).map((k, i) => {
              let value = this.props.tracks_info[k];
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
        </BlockUi>
        <div className="row">
          {this.props.tracker_last_data_info && Object.keys(this.props.tracker_last_data_info).length > 0 && <TrackerLastData tracker_last_data={this.props.tracker_last_data_info} />}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tracks_info: state.tracks.info,
    tracks_loading: state.tracks.loading,
    tracker_last_data_info: state.tracker_last_data.info,
    tracker_last_data_loading: state.tracker_last_data.loading,
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
