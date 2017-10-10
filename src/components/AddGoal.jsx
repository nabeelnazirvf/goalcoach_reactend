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
                //alert(data);
                var newData = data.split(',');
                var title = newData[0];
                var email = newData[1];
                var id = newData[2];
                that.appendGoalItem(title, email, id);
                //alert(data);
            });
        });
    }

    componentWillUnmount() {
        client.unsubscribe("/messages/new")
    }

    appendGoalItem(title, email, id) {
        console.log('appendGoalItem data ', title, email, id);
        this.props.setGoals({title: title, email: email, id: id});
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
            <div className="form-inline">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Add a goal"
                        className="form-control"
                        style={{marginRight: '5px'}}
                        onChange={event => this.setState({title: event.target.value})}
                    />
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => this.addGoal()}
                    >
                        Submit
                    </button>
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