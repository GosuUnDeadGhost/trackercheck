import Request from './request';

export const getTrackerInfo = (id) => dispatch => {
  Request({
    action: "info",
    id: id,
    cb: (data) => {
      console.log(data);
      dispatch({ type: 'FETCH_TRACKER_INFO_SUCCESS', payload: data});
    }
  })
}

export const getTrackerLastData = (id) => dispatch => {
  Request({
    action: "lastData",
    id: id,
    cb: (data) => {
      console.log(data);
      dispatch({ type: 'FETCH_TRACKER_LAST_DATA_SUCCESS', payload: data});
    }
  })
}
