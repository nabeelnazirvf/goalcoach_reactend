import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGoals, setCurrentUser } from "../actions/index";
import { browserHistory } from 'react-router';
import $ from "jquery";
import GoalItem from './GoalItem';

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    addGoal() {
        const { title } = this.state;
        const { email } = this.props.current_user.email;
        let user_id = this.props.current_user.id? this.props.current_user.id : JSON.parse(window.localStorage.getItem('currentUser')).id;
        fetch("http://localhost:3001/goals.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({email: email, title: title, user_id: user_id})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    this.props.setGoals(json);
                    $('#add-goal-modal-close').click();
                });

            } else {
                browserHistory.replace('/signin');
            }
        });

    }

    render() {

        return (
            <div className="modal fade" id="add-goal-modal"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title" id="myModalLabel4">Add Goal</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Add Goal</h4>
                                    <p>
                                        <input
                                            type="text"
                                            placeholder="Add a goal"
                                            className="form-control"
                                            style={{marginRight: '5px'}}
                                            onChange={event => this.setState({title: event.target.value})}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id={"add-goal-modal-close"} type="button" className="btn-u btn-u-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn-u btn-u-primary" onClick={() => this.addGoal()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    const { goals } = state;
    const { current_user } = state;
    return {
        user,
        goals,
        current_user
    }
}

export default connect(mapStateToProps, {setGoals,setCurrentUser})(AddGoal);