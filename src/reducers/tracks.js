const initialState = {
  trackers: [],
  loading: false
};

export default function tracks(state = initialState, action) {
  if (action.type === 'FETCH_TRACKER_INFO_SUCCESS') {
    const index = findTracker(state.trackers, action.payload);
    let trackers = state.trackers;
    if (index !== -1){
      console.log(state.trackers, index, action.payload);
      trackers.splice(index, 1, action.payload);
    } else {
      trackers = trackers.concat(action.payload);
    }

    return updateObject(state, {trackers: trackers});
  } else if (action.type === 'CLEAR_TRACKER_INFO') {
    //return initialState;
  } else if (action.type === 'FETCH_ON_TRACKER_INFO_START') {
    //return Object.assign({}, state, {loading: true});
    return updateObject(state, {loading: true});
  } else if (action.type === 'FETCH_ON_TRACKER_INFO_STOP') {
    //return Object.assign({}, state, {loading: false});
    return updateObject(state, {loading: false});
  }
  return state;
}

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues)
}

function findTracker(trackers, data) {
  return trackers.findIndex((item, i) => item.ID === data.ID);
}
