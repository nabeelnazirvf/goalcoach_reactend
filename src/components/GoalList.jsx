import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals, loadGoals} from "../actions/index";
import GoalItem from './GoalItem';
import { browserHistory } from 'react-router';
class GoalList extends Component {

    componentDidMount(){
        let user_id = this.props.desired_user.id? this.props.desired_user.id : JSON.parse(window.localStorage.getItem('currentUser')).id;
        fetch("SERVER_URL/goals.json?user_id="+user_id, {
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
                    this.props.loadGoals(json);
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        return(
            <div className="">
                {
                    this.props.goals.map((goal, index) => {
                        return (
                            <GoalItem key={index} goal={goal} user={this.props.user} user_id={this.props.desired_user.id}  desired_user={this.props.desired_user}/>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { goals } = state;
    const { user } = state;
    const { email } = user;
    const { current_user } = state;
    const { goal_comments } = state;
    return {
        user,
        email,
        goals,
        current_user

    }
}

export default connect(mapStateToProps, { setGoals, loadGoals })(GoalList);
