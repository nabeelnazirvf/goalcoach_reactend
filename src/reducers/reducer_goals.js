import {SET_GOALS, UPDATE_GOAL, DELETE_GOAL, LOAD_GOALS} from '../constants';

const goal = (action) => {
    let {title,serverKey,email} = action;
    return{
        email,
        title,
        serverKey
    }
}

const removeBykey = (all_goals, id) => {
    all_goals = all_goals.filter(goal => goal.id !== id);
    return all_goals;
}


export default (all_goals = [], action) => {
    let newGoals = [];
    switch(action.type) {
        case LOAD_GOALS:
            const { goals } = action;
            all_goals = goals;
            return all_goals;
        case SET_GOALS:
            let goal = action.goal;
            all_goals.unshift(goal);
            all_goals = all_goals.slice();
            return all_goals;
        case UPDATE_GOAL:
            all_goals.forEach((userGoal) => {
                if(userGoal.id === action.id) {
                    userGoal.title = action.title;
                }
                newGoals.push(userGoal);
            });
            return newGoals;
        case DELETE_GOAL:
            newGoals = removeBykey(all_goals, action.id);
            return newGoals;

        default:
            return all_goals;
    }
}