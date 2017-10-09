import {SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL, UPDATE_GOAL, DELETE_GOAL, LOAD_GOALS, SET_CURRENT_USER} from '../constants';


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

export const updateGoal = (email, title, id) => {
    const action = {
        type: UPDATE_GOAL,
        email,
        title,
        id
    }
    return action;
}

export const deleteGoal = (id) => {
    const action = {
        type: DELETE_GOAL,
        id
    }
    return action;
}

export const setCurrentUser = (current_user) => {
    const action = {
        type: SET_CURRENT_USER,
        current_user
    }
    console.log('setCurrentUser action', action);
    return action;
}