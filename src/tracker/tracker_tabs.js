import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrackerLastData, getTrackerTrack } from '../actions/tracks';

import {TrackerModel} from './tracker_model.js';

class TrackerTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active_tracker: 0,
      action: ""
    }
  }

  // <div className="col-12" key={1}><h3>Трекер: {this.props.tracks_info.ID}</h3></div>,
  // Object.keys(TrackerModel).map((k, i) => {
  //   let value = this.props.tracks_info[k];
  //   return (
  //     <div className="row" key={i}>
  //       <div className="col-6">{TrackerModel[k]}</div>
  //       <div className="col-6">{value ? value : "-"}</div>
  //     </div>
  //   );
  // }),
  // <div className="row m-2" key={2}>
  //   <div className="col-12">
  //     <button className="btn btn-primary m-2" onClick={ this.getTrackerLastData }>Последние данные</button>
  //     <button className="btn btn-primary m-2" onClick={ this.getTrackerTrack }>Трек</button>
  //   </div>
  // </div>

  // <li className="active"><a data-toggle="tab" href="#home">Home</a></li>
  // <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
  // <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>

  /*

  {this.props.trackers.forEach((item, i) => {
    return (<li><a data-toggle="tab" href="#menu1">Menu 1</a></li>);
  })}
  */


  /*


  <div className="tab-content">
    <div id="home" className="tab-pane fade in active">
      <h3>HOME</h3>
      <p>Some content.</p>
    </div>
    <div id="menu1" className="tab-pane fade">
      <h3>Menu 1</h3>
      <p>Some content in menu 1.</p>
    </div>
    <div id="menu2" className="tab-pane fade">
      <h3>Menu 2</h3>
      <p>Some content in menu 2.</p>
    </div>
  </div>

  */

  handleSelect = (tracker) => {
    this.setState({ active_tracker: tracker })
  }

  getTrackersList = () => {
    const self = this;
    return (
    <ul className="nav nav-tabs">
    {this.props.trackers.map((item, i) => {
      const link = "#tracker"+i;
      let active = '';
      if (i === self.state.active_tracker)
        active = "active";
      return <li key={i} className={active}><a data-toggle="tab" href={link} onClick={() => this.handleSelect(i)}>{item.ID}</a></li>
    })}
    </ul>);
  }

  getTrackerLastData = () => {
    this.setState({ action: "last_data" });
    this.props.onGetTrackerLastData(this.props.trackers[this.state.active_tracker].ID);
  }

  getTrackerTrack = () => {
    this.setState({ action: "get_track" });
    this.props.onGetTrackerTrack(this.props.trackers[this.state.active_tracker].ID);
  }

  getTrackersListContent = () => {
    const self = this;
    return (
      <div className="tab-content">
      {this.props.trackers.map((item, i) => {
        let link = "tracker"+i;
        let active = "tab-pane fade";
        if (i === self.state.active_tracker)
          active += " active in";
        return (
          <div id={link} key={i} className={active}>
            <h3>{item.ID} "DELETE BTN"</h3>
              <div className="container">
              {Object.keys(TrackerModel).map((k, i) => {
                let value = self.props.trackers[self.state.active_tracker][k];
                return (
                    <div key={i}>{TrackerModel[k]}: {value ? value : "-"}</div>
                );
              })}
            </div>
            <div className="row m-2" key={2}>
              <div className="col-12">
                <button className="btn btn-primary m-2" onClick={ () => {this.getTrackerLastData()} }>Последние данные</button>
                <button className="btn btn-primary m-2" onClick={ () => {this.getTrackerTrack()} }>Трек</button>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    );
  }

  render() {
    console.log("render");
    return (
      <div>
        {this.getTrackersList()}
        {this.getTrackersListContent()}


      </div>
    );
  }
}

export default connect(
  state => ({
    trackers: state.tracks.trackers,
    tracks_loading: state.tracks.loading,
  }),
  dispatch => ({
    onGetTrackerLastData: (id) => {
      dispatch(getTrackerLastData(id));
    },
    onGetTrackerTrack: (id) => {
      dispatch(getTrackerTrack(id));
    }
  })
)(TrackerTabs);
