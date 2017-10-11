import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals, loadGoals } from "../actions/index";
import GoalItem from './GoalItem';
import { browserHistory } from 'react-router';
class GoalList extends Component {

    componentDidMount(){
        fetch("http://localhost:3001/goals.json", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
            console.log("Fail zone", error);
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
        console.log('this.props.goals in goal list render', this.props.goals);
        return(
            <ul className="timeline-v2">
                {
                    this.props.goals.map((goal, index) => {
                        return (
                            <GoalItem key={index} goal={goal} user={this.props.user} />
                        )
                    })
                }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    const { goals } = state;
    const { user } = state;
    const { email } = user;
    return {
        user,
        email,
        goals
    }
}

export default connect(mapStateToProps, { setGoals, loadGoals })(GoalList);
