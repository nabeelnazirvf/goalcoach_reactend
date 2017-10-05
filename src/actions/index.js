import {SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL, UPDATE_GOAL, DELETE_GOAL, LOAD_GOALS} from '../constants';


export function logUser(email) {
    console.log('logUser action', email);
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}

export function setGoals(goal) {
    const action = {
        type: SET_GOALS,
        goal
    }
    return action;
}

export function loadGoals(goals) {
    const action = {
        type: LOAD_GOALS,
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
    return action;
}
