import { SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL, UPDATE_GOAL} from '../constants';


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

export const updateGoal = (title, serverKey, email) => {
    console.log('updateGoal action', title);
    const action = {
        type: UPDATE_GOAL,
        title,
        serverKey,
        email
    }
    return action;
}
