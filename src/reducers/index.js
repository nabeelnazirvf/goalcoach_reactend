import { combineReducers } from 'redux';
import user from './reducer_user';
import current_user from './reducer_user';
import goals from './reducer_goals';
import completeGoals from './reducer_completed_goals';
import all_notifications from './reducer_notifications'

export default combineReducers({
    user,
    goals,
    completeGoals,
    current_user,
    all_notifications
})