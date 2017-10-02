import {SET_GOALS, UPDATE_GOAL, DELETE_GOAL} from '../constants';

const goal = (action) => {
    console.log('goal reducer', action);
    let {title,serverKey,email} = action;
    return{
        email,
        title,
        serverKey
    }
}

const removeBykey = (all_goals, serverKey) => {
    all_goals = all_goals.filter(goal => goal.serverKey !== serverKey);
    console.log('new reduced goals', all_goals);
    return all_goals;
}


export default (all_goals = [], action) => {
    let newGoals = [];
    switch(action.type) {
        case SET_GOALS:
            console.log('SET_GOALS goals and action: ', goals, action);
            const { goals } = action;
            return goals;
        case UPDATE_GOAL:
            console.log('goals UPDATE_GOAL reducer', goal(action));
            all_goals.forEach((userGoal) => {
                if(userGoal.serverKey === action.serverKey) {
                    userGoal.title = action.title;
                }
                newGoals.push(userGoal);
            });
        case DELETE_GOAL:
            newGoals = removeBykey(all_goals, action.serverKey);
            return newGoals;

        default:
            return all_goals;
    }
}