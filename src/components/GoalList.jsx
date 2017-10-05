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
                    console.log('goals', json);
                    this.props.loadGoals(json);
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        console.log('render of goals list', this.props);
        return(
            <div>
                {
                    this.props.goals.map((goal, index) => {
                        return (
                            <GoalItem key={index} goal={goal} user={this.props.user} />
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
    return {
        user,
        email,
        goals
    }
}

export default connect(mapStateToProps, { setGoals, loadGoals })(GoalList);
