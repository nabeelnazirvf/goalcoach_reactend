import {SET_COMMENTS} from '../constants';

export default (goal_comments = [], action) => {
    let newComments = [];
    switch(action.type) {
        case SET_COMMENTS:
            const { comments } = action;
            goal_comments = comments;
            console.log('goal_comments REDUCER*:', goal_comments);
            return goal_comments;
        default:
            return goal_comments;
    }
}