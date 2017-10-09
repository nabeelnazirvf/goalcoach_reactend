import { SIGNED_IN, SET_USER_EMAIL, SET_CURRENT_USER} from '../constants';

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
        case SET_CURRENT_USER:
            const {current_user} = action;
            console.log('setCurrentUser reducer', current_user , action);
            return current_user;
        default:
            return state;

    }
}