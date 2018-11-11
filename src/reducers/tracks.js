const initialState = {};

export default function tracks(state = initialState, action) {
  if (action.type === 'FETCH_TRACKER_INFO_SUCCESS') {
    return action.payload;
  } else if (action.type === 'CLEAR_TRACKER_INFO') {
    return state;
  } else if (action.type === 'FETCH_ON_TRACKER_INFO_START') {
    return action.payload;
  } else if (action.type === 'FETCH_ON_TRACKER_INFO_STOP') {
    return action.payload;
  }
  return state;
}
