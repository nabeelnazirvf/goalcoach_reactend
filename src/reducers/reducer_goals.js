import {SET_GOALS, UPDATE_GOAL} from '../constants';

const goal = (action) => {
    console.log('goal reducer', action);
    let {title,serverKey,email} = action;
    return{
        title,
        serverKey,
        email
    }
}


export default (state = [], action) => {
    let userGoals = null;
    switch(action.type) {
        case SET_GOALS:
            const { userGoals } = action;
            return userGoals;
        case UPDATE_GOAL:
            userGoals = [...state, goal(action)];
            console.log('goals UPDATE_GOAL reducer', userGoals);
            return userGoals;
        default:
            return state;
    }
}