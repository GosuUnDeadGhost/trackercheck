import React, { Component } from 'react';
import { connect } from 'react-redux';
import './tracker.css';
import TrackerLastData from '../tracker_last_data/tracker_last_data.js';
import {TrackerModel} from './tracker_model.js';
//import TrackerCarousel from './trackers_carousel';
import { getTrackerInfo, getTrackerLastData, getTrackerTrack } from '../actions/tracks';
import BlockUi from 'react-block-ui';


class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracker_id: this.props.tracks_info ? this.props.tracks_info.ID : '',
      action: "",
      key: 1
    }

    this.handleSelect = this.handleSelect.bind(this);
    //console.log(this.state, this.props);
  }

  handleSelect(key) {
    console.log('selected' + key);
    this.setState({ key: key });
  }

  handleChange = (e) => this.setState({ tracker_id: e.target.value })

   handleClick = () => {
     this.props.onGetTrackerInfo(this.trackInput.value);
   };

  getTrackerLastData = () => {
    this.setState({ action: "last_data" });
    this.props.onGetTrackerLastData(this.props.tracks_info.ID);
  }

  getTrackerTrack = () => {
    this.setState({ action: "get_track" });
    this.props.onGetTrackerTrack(this.props.tracks_info.ID);
  }

  getAction = () => {
    if (this.state.action === "last_data")
      return this.props.tracker_last_data_info && Object.keys(this.props.tracker_last_data_info).length > 0 && <TrackerLastData tracker_last_data={this.props.tracker_last_data_info} />;
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

  //<TrackerCarousel key={0}/>,

  render() {
    let action;
    console.log(this.state.key);
    return (
      <div>

      <div className="container">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
        <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
        <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
      </ul>

      <div class="tab-content">
        <div id="home" class="tab-pane fade in active">
          <h3>HOME</h3>
          <p>Some content.</p>
        </div>
        <div id="menu1" class="tab-pane fade">
          <h3>Menu 1</h3>
          <p>Some content in menu 1.</p>
        </div>
        <div id="menu2" class="tab-pane fade">
          <h3>Menu 2</h3>
          <p>Some content in menu 2.</p>
        </div>
      </div>
        <BlockUi tag="div" blocking={this.props.tracks_loading || this.props.tracker_last_data_loading}>
          <div className="row p-2">
            <div className="col-12"><input type="text" value={this.state.tracker_id } onChange={this.handleChange} ref={(input) => { this.trackInput = input }} /></div>
            <div className="col-12 m-2"><button className="btn btn-primary" onClick={this.handleClick} >Найти</button></div>
          </div>
        </BlockUi>
        <BlockUi tag="div" blocking={this.props.tracker_last_data_loading}>
        {
          this.props.tracks_info && Object.keys(this.props.tracks_info).length > 0 &&
          [

            <div className="col-12" key={1}><h3>Трекер: {this.props.tracks_info.ID}</h3></div>,
            Object.keys(TrackerModel).map((k, i) => {
              let value = this.props.tracks_info[k];
              return (
                <div className="row" key={i}>
                  <div className="col-6">{TrackerModel[k]}</div>
                  <div className="col-6">{value ? value : "-"}</div>
                </div>
              );
            }),
            <div className="row m-2" key={2}>
              <div className="col-12">
                <button className="btn btn-primary m-2" onClick={ this.getTrackerLastData }>Последние данные</button>
                <button className="btn btn-primary m-2" onClick={ this.getTrackerTrack }>Трек</button>
              </div>
            </div>
          ]
        }
        </BlockUi>
        <div className="row">
          {this.getAction(action)}
        </div>
      </div>
      </div>
    )
  }
}

//{this.props.tracker_last_data_info && Object.keys(this.props.tracker_last_data_info).length > 0 && <TrackerLastData tracker_last_data={this.props.tracker_last_data_info} />}

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
    },
    onGetTrackerTrack: (id) => {
      dispatch(getTrackerTrack(id));
    }
  })
)(Tracker);
