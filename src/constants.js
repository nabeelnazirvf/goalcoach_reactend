export const SIGNED_IN = 'SIGNED_IN';
export const EDIT_USER = 'EDIT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_GOALS = 'SET_GOALS';
export const SET_COMPLETED = 'SET_COMPLETED';
export const SET_USER_EMAIL = 'SET_COMPLETED';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const DELETE_GOAL = 'DELETE_GOAL';
export const LOAD_GOALS = 'LOAD_GOALS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';

const production_flag = false;
export const SERVER_URL = production_flag ? "" : "http://localhost:3001/";