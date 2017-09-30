import { SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL} from '../constants';


export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}

export function setGoals(userGoals) {
    const action = {
        type: SET_GOALS,
        userGoals
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