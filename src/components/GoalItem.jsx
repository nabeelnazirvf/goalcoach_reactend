import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from "../actions/index";
import { completeGoalRef, goalRef } from '../firebase';
import EditGoal from "./EditGoal";
import { updateGoal } from "../actions/index";

class GoalItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.goal.title,
            isEditVisible: false
        }
        this.updateGoal = this.updateGoal.bind(this);
        this.editTitle = this.editTitle.bind(this);
    }

    completeGoal() {
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goal;
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email, title});
    }

    editTitle(text) {
        this.setState({title: text});
    }

    deleteGoal(serverKey){
        this.props.deleteGoal(serverKey);
        goalRef.child(serverKey).remove();
    }

    updateGoal(serverKey,email, title){
        this.props.updateGoal(email, title, serverKey);
        goalRef.child(serverKey).set({ title: title, email: email});
        this.setState({isEditVisible: false});
    }

    render() {
        //alert('HELLO!!!');
        const { email, title, serverKey } = this.props.goal;
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
                    onClick={() => this.setState({ isEditVisible: true}) }>
                    Edit
                </button>
                { this.state.isEditVisible ? <EditGoal goal={this.props.goal} title={this.state.title} updateGoal={this.updateGoal} editTitle={this.editTitle} /> : null }
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.deleteGoal(serverKey) }>
                    Delete
                </button>
            </div>
        )
    }
}

export default connect(null, { deleteGoal, updateGoal })(GoalItem);
