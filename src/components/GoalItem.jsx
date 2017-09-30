import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeGoalRef, goalRef } from '../firebase';
import EditGoal from "./EditGoal";

class GoalItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isEditVisible: false
        }
    }

    completeGoal() {
        // add to complete goals on the database
        // remove this goal from the goals reference
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goal;
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email, title});
    }
    render() {
        const { email, title, key } = this.props.goal;
        return (
            <div style={{margin: '5px'}}>
                <strong>{title}</strong>
                <span style={{marginRight: '5px'}}> submitted by <em>{email}</em></span>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => this.completeGoal()}>
                    Complete
                </button>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => this.setState({ isEditVisible: true }) }>
                    Edit
                </button>
                { this.state.isEditVisible ? <EditGoal goal={this.props.goal} /> : null }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    }
}

export default connect(mapStateToProps, null)(GoalItem);