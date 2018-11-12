import Request from './request';

export const getTrackerInfo = (id) => dispatch => {

  dispatch({ type: 'FETCH_ON_TRACKER_INFO_START', payload: {loading: true}});

  Request({
    action: "trackers/info/" + id,
    method: "GET",
    cb: (data) => {
      dispatch({ type: 'FETCH_ON_TRACKER_INFO_STOP', payload: {loading: false}});
      //console.log(data);
      dispatch({ type: 'FETCH_TRACKER_INFO_SUCCESS', payload: {info: data}});
    }
  })
}

export const getTrackerLastData = (id) => dispatch => {

  dispatch({ type: 'FETCH_ON_TRACKER_LAST_DATA_START', payload: {loading: true}});

  Request({
    action: "trackers/lastData/" + id,
    method: "GET",
    cb: (data) => {
      dispatch({ type: 'FETCH_ON_TRACKER_LAST_DATA_STOP', payload: {loading: false}});
      //console.log(data);
      dispatch({ type: 'FETCH_TRACKER_LAST_DATA_SUCCESS', payload: {info: data}});
    }
  })
}

export const getTrackerTrack = (id) => dispatch => {

  dispatch({ type: 'FETCH_ON_TRACKER_GET_TRACK_START', payload: {loading: true}});

  Request({
    action: "trackers/getTrack/" + id,
    method: "GET",
    cb: (data) => {
      dispatch({ type: 'FETCH_ON_TRACKER_GET_TRACK_STOP', payload: {loading: false}});
      console.log(data);
      dispatch({ type: 'FETCH_TRACKER_GET_TRACK_SUCCESS', payload: {info: data}});
    }
  })
}
