import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from "../actions/index";
import { completeGoalRef, goalRef } from '../firebase';
import EditGoal from "./EditGoal";
import { updateGoal } from "../actions/index";
import { browserHistory } from 'react-router';

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

    deleteGoal(id){
        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({goal_id: id})
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            console.log('res', res);
            if (res.ok) {
                this.props.deleteGoal(id);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    updateGoal(id,email, title){

        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({title: title, goal_id: id})
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            console.log('res', res);
            if (res.ok) {
                this.props.updateGoal(email, title, id);
                this.setState({isEditVisible: false});

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    render() {
        console.log('Goal item goals', this.props, this.props.goal.title);
        const {title, id, serverKey } = this.props.goal;
        const {email } = this.props.user;
        return (
            <tbody>
            <tr data-status="completed">
                <td align="center"><input type="checkbox" className="checkthis"/></td>
                <td align="center">
                    <a className="btn btn-default" onClick={() => this.setState({ isEditVisible: true}) }>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" onClick={() => this.deleteGoal(id) }>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </a>
                </td>
                <td>{title}</td>
                <td>{email}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>
                    { this.state.isEditVisible ? <EditGoal goal={this.props.goal} title={this.state.title} updateGoal={this.updateGoal} editTitle={this.editTitle} /> : null }
                </td>
                <td></td>
            </tr>
            </tbody>
        )
    }
}

export default connect(null, { deleteGoal, updateGoal })(GoalItem);
