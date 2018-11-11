const initialState = {};

export default function tracker_last_data (state = initialState, action) {
  if (action.type === 'FETCH_TRACKER_LAST_DATA_SUCCESS') {
    return action.payload;
  } else if (action.type === 'CLEAR_LAST_DATA') {
    return initialState;
  } else if (action.type === 'FETCH_ON_TRACKER_LAST_DATA_START') {
    return action.payload;
  } else if (action.type === 'FETCH_ON_TRACKER_LAST_DATA_STOP') {
    return action.payload;
  }
  return state;
}
