import {SET_COMMENTS, SET_COMMENT} from '../constants';

export default (goal_comments = [], action) => {
    switch(action.type) {
        case SET_COMMENTS:
            const { data } = action;
            goal_comments = data;
            return goal_comments;
        case SET_COMMENT:
            const { comment } = action;
            goal_comments.unshift(comment);
            goal_comments = goal_comments.slice();
            return goal_comments;
        default:
            return goal_comments;
    }
}