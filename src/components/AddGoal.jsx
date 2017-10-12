import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGoals, setCurrentUser } from "../actions/index";
import { browserHistory } from 'react-router';
import $ from "jquery";
import GoalItem from './GoalItem';
var faye = require('faye');
var client = new faye.Client('http://localhost:9292/faye');

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.appendGoalItem = this.appendGoalItem.bind(this);
    }

    componentDidMount(){
        var that = this;
        $(function() {
            console.log('request AIIII componentDidMount');
            client.subscribe("/messages/new", function(data) {
                var newData = data.split(',');
                var title = newData[0];
                var email = newData[1];
                var id = newData[2];
                var created_at = newData[3];
                that.appendGoalItem(title, email, id, created_at);
                //alert(data);
            });
        });
    }

    componentWillUnmount() {
        client.unsubscribe("/messages/new")
    }

    appendGoalItem(title, email, id, created_at) {
        this.props.setGoals({title: title, email: email, id: id, created_at: created_at});
        //<GoalItem key={"abc"} goal={this.props.goals[0]} user={this.props.user} />
    }

    addGoal() {
        const { title } = this.state;
        const { email } = this.props.current_user.email;
        fetch("http://localhost:3001/goals.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({email: email, title: title})
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log('this.props in ok of fetch', this.props, json);
                    //this.props.setGoals(json);
                    $('#add-goal-modal-close').click();
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });

    }

    render() {

        return (
            <div className="modal fade" id="add-goal-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
    console.log('mapStateToProps in add goal', state);
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