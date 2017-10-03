import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCompleted } from '../actions';
import { completeGoalRef } from '../firebase';

class CompleteGoalList extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps in complete', this.props, nextProps);
        if(this.props.user.email !== nextProps.user.email) {
            console.log('this.props.user.email', this.props, nextProps, );
            completeGoalRef.orderByChild('email').equalTo(nextProps.user.email).on('value', snap => {
                //completeGoalRef.on('value', snap => {
                let completeGoals = [];
                snap.forEach(completeGoal => {
                    const {email, title} = completeGoal.val();
                    completeGoals.push({email, title})
                })
                this.props.setCompleted(completeGoals);
            })
        }
    }

    clearCompleted() {
        completeGoalRef.set([]);
    }

    render() {
        return (
            <div>
                {
                    this.props.completeGoals.map((completeGoal, index) => {
                        const { title, email } = completeGoal;
                        return (
                            <div key={index}>
                                <strong>{title}</strong> completed by <em>{email}</em>
                            </div>
                        )
                    })
                }
                <button
                    className="btn btn-primary"
                    onClick={() => this.clearCompleted()}
                >
                    Clear All
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state in complete', state);
    const { completeGoals } = state;
    const { user } = state;
    return {
        completeGoals,
        user
    }
}

export default connect(mapStateToProps, { setCompleted })(CompleteGoalList);