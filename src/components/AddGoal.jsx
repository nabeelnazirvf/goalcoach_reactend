import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { browserHistory } from 'react-router';

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
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
    const { user } = state;
    return {
        user
    }
}

export default connect(mapStateToProps, null)(AddGoal);