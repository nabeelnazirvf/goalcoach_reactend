import { SIGNED_IN, SET_USER_EMAIL, SET_CURRENT_USER} from '../constants';

let user = {
    email: null
}

export default (state = user, action) => {
    switch (action.type){
        case SIGNED_IN:
            return state;
        case SET_USER_EMAIL:
            return user;
        case SET_CURRENT_USER:
            const {current_user} = action;
            console.log('current_user reducer', current_user);
            return current_user;
        default:
            return state;

    }
}