import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from "../actions/index";
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

    componentDidMount(){
        var that = this;
        $(function() {
            console.log('request AIIII');
            var faye = require('faye');
            var client = new faye.Client('http://localhost:9292/faye');
            client.subscribe("/messages/new", function(data) {
                that.appendGoalItem(data);
                //alert(data);
            });
        });
    }

    appendGoalItem(data) {
        console.log('appendGoalItem data ', data, data["title"], data.title, data[0]);
        //alert(data);
        this.props.setGoals({title: 'abcdef', email:'yes@yahoo.com' });
        //<GoalItem key={"abc"} goal={this.props.goals[0]} user={this.props.user} />
    }

    addGoal() {
        const { title } = this.state;
        const { email } = this.props.user;
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
                    this.props.setGoals({title:json.title, email: json.email});
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
    return {
        user,
        goals
    }
}

export default connect(mapStateToProps, {setGoals})(AddGoal);