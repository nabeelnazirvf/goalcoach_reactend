import {
    SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_EMAIL, UPDATE_GOAL, DELETE_GOAL, LOAD_GOALS, SET_CURRENT_USER,
    SET_NOTIFICATIONS, SET_NOTIFICATION, SET_COMMENTS, SET_COMMENT
} from '../constants';
import {SERVER_URL} from '../constants';

export function logUser(email) {
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
    return action;
}


export function setNotifications(notifications) {
    const action = {
        type: SET_NOTIFICATIONS,
        notifications
    }
    return action;
}
export function setNotification(notification) {
    const action = {
        type: SET_NOTIFICATION,
        notification
    }
    return action;
}
export function setComments(comments) {
    const action = {
        type: SET_COMMENTS,
        comments
    }
    return action;
}
export function setComment(comment) {
    const action = {
        type: SET_COMMENT,
        comment
    }
    return action;
}
export function getAllComments(){
    return (dispatch) => {
        fetch(SERVER_URL+"/comments/all_comments.json", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    dispatch ({
                        type: SET_COMMENTS,
                        data: json
                    })
                });

            } else {
                //browserHistory.replace('/signin');
            }
        });
    }
}