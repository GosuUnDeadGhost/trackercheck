import { combineReducers } from 'redux';

import tracks from './tracks';
import tracker_last_data from './tracker_last_data';

export default combineReducers({
  tracks,
  tracker_last_data
});
