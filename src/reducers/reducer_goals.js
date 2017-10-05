import {SET_GOALS, UPDATE_GOAL, DELETE_GOAL, LOAD_GOALS} from '../constants';

const goal = (action) => {
    let {title,serverKey,email} = action;
    return{
        email,
        title,
        serverKey
    }
}

const removeBykey = (all_goals, serverKey) => {
    all_goals = all_goals.filter(goal => goal.serverKey !== serverKey);
    return all_goals;
}


export default (all_goals = [], action) => {
    let newGoals = [];
    switch(action.type) {

        case LOAD_GOALS:

            const { goals } = action;
            all_goals = goals;

            return all_goals;

        case SET_GOALS:

            console.log('action',action);
            let goal = action.goal;
            goal.created_at = '';
            goal.updated_at = '';

            console.log('reducer all goals', goal);
            console.log('all_goals', all_goals);

            all_goals.push(goal);
            console.log('all_goals', all_goals);

            all_goals = all_goals.slice();

            return all_goals;


        case UPDATE_GOAL:
            all_goals.forEach((userGoal) => {
                if(userGoal.serverKey === action.serverKey) {
                    userGoal.title = action.title;
                }
                newGoals.push(userGoal);
            });
        case DELETE_GOAL:
            newGoals = removeBykey(all_goals, action.serverKey);
            return newGoals;

        default:
            return all_goals;
    }
}