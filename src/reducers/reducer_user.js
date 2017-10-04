import { SIGNED_IN, SET_USER_EMAIL } from '../constants';

let user = {
    email: null
}

export default (state = user, action) => {
    switch (action.type){
        case SIGNED_IN:
            const { email } = action;
            user = {
                email
            }
            console.log('SIGNED_IN reducer', user);
            return user;
        case SET_USER_EMAIL:
            return user;
        default:
            return state;

    }
}