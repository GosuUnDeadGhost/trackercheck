import { combineReducers } from 'redux';

import tracks from './tracks';
import tracker_last_data from './tracker_last_data';
import login from './login';

export default combineReducers({
  tracks,
  tracker_last_data,
  login
});
