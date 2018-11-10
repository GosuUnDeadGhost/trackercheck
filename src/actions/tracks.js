import Request from './request';

export const getTrackerInfo = (id) => dispatch => {
  Request({
    action: "trackers/info/" + id,
    method: "GET",
    cb: (data) => {
      console.log(data);
      dispatch({ type: 'FETCH_TRACKER_INFO_SUCCESS', payload: data});
    }
  })
}

export const getTrackerLastData = (id) => dispatch => {
  Request({
    action: "trackers/lastData/" + id,
    method: "GET",
    cb: (data) => {
      console.log(data);
      dispatch({ type: 'FETCH_TRACKER_LAST_DATA_SUCCESS', payload: data});
    }
  })
}
