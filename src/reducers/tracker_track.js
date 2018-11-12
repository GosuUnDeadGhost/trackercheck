const initialState = {};

export default function tracker_track(state = initialState, action) {
  if (action.type === 'FETCH_TRACKER_GET_TRACK_SUCCESS') {
    return action.payload;
  } else if (action.type === 'CLEAR_TRACK_INFO') {
    return state;
  } else if (action.type === 'FETCH_ON_TRACKER_GET_TRACK_START') {
    return action.payload;
  } else if (action.type === 'FETCH_ON_TRACKER_GET_TRACK_STOP') {
    return action.payload;
  }
  return state;
}
