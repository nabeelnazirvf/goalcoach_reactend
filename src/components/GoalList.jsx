import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from "../actions/index";
import GoalItem from './GoalItem';

class GoalList extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps in listing ', this.props, nextProps);
        if(this.props.email !== nextProps.email){
            goalRef.orderByChild('email').equalTo(nextProps.email).on('value', snap => {
            //goalRef.on('value', snap => {
                let goals = [];
                snap.forEach(goal => {
                    let goalObject = goal.val();
                    const { email, title } = goal.val();
                    const serverKey = goal.key;
                    goals.push({ email, title, serverKey });
                })
                this.props.setGoals(goals);
            })
        }
    }
    render(){
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

export default connect(mapStateToProps, { setGoals })(GoalList);
