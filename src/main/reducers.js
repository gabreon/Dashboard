import { combineReducers } from 'redux';

import authReducer from '../modules/Login/reducer';
import dashboardReducer from '../modules/Dashboard/reducer';

const reducers = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default reducers;