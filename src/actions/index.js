import {SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL, UPDATE_GOAL, DELETE_GOAL} from '../constants';


export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}

export function setGoals(goals) {
    const action = {
        type: SET_GOALS,
        goals
    }
    return action;
}

export function setCompleted(completeGoals) {
    const action = {
        type: SET_COMPLETED,
        completeGoals
    }
    return action;
}

export function setUserEmail(user) {
    const action = {
        type: SET_USER_EMAIL,
        user
    }
    return action;
}

export const updateGoal = (email, title, serverKey) => {
    console.log('updateGoal action', title);
    const action = {
        type: UPDATE_GOAL,
        email,
        title,
        serverKey
    }
    return action;
}

export const deleteGoal = (serverKey) => {
    const action = {
        type: DELETE_GOAL,
        serverKey
    }
    console.log('deleting in actions', action);
    return action;
}
