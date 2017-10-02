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
        // add to complete goals on the database
        // remove this goal from the goals reference
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goal;
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email, title});
    }

    editTitle(text) {
        this.setState({title: text});
    }

    deleteGoal(serverKey){
        console.log('server key', serverKey);
        this.props.deleteGoal(serverKey);
        goalRef.child(serverKey).remove();
    }

    updateGoal(serverKey,email, title){
        console.log('updateGoal this.state.goal and serverKey', this.state.title, serverKey);
        this.props.updateGoal(email, title, serverKey);
        goalRef.child(serverKey).set({ title: title, email: email});
        //this.setState({update_form: false})
        this.setState({isEditVisible: false});
    }

    render() {
        console.log('goal item props', this.props.goal);
        const { email, title, serverKey } = this.props.goal;
        console.log('goal item attr', email, title, this.props.goal.serverKey );
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
// function mapStateToProps(state) {
//     return {}
// }


//export default GoalItem;
export default connect(null, { deleteGoal, updateGoal })(GoalItem);
