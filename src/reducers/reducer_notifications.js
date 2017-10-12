import {SET_NOTIFICATIONS} from '../constants';


export default (all_notifications = [], action) => {
    let notifications = [];
    switch(action.type) {
        case SET_NOTIFICATIONS:
            const { notifications } = action;
            all_notifications = notifications;
            console.log('reducer all_notifications:',all_notifications);
            return all_notifications;
        default:
            return all_notifications;
    }
}