import { combineReducers } from 'redux';
import user from './reducer_user';
import current_user from './reducer_user';
import goals from './reducer_goals';
import completeGoals from './reducer_completed_goals';
import all_notifications from './reducer_notifications'
import goal_comments from './reducer_comments'

export default combineReducers({
    user,
    goals,
    completeGoals,
    current_user,
    all_notifications,
    goal_comments
})