import { combineReducers } from 'redux';
import users from './users/reducer';
import auth from './authentication/reducer';
import tasks from './tasks/reducer';

export default combineReducers({
  users,
  auth,
  tasks,
});
