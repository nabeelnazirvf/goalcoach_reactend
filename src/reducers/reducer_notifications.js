import {SET_NOTIFICATIONS, SET_NOTIFICATION} from '../constants';


export default (all_notifications = [], action) => {
    let notifications = [];
    switch(action.type) {
        case SET_NOTIFICATIONS:
            const { notifications } = action;
            all_notifications = notifications;
            return all_notifications;
        case SET_NOTIFICATION:
            const { notification } = action;
            all_notifications.unshift(notification);
            all_notifications = all_notifications.slice();
            return all_notifications;
        default:
            return all_notifications;
    }
}