import { combineReducers } from 'redux';

import tracks from './tracks';
import tracker_last_data from './tracker_last_data';
import tracker_track from './tracker_track';
import login from './login';

export default combineReducers({
  tracks,
  tracker_last_data,
  login,
  tracker_track
});
