import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import {logUser} from "../actions/index";
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signUp() {
        const { email, password } = this.state;
        fetch("http://localhost:3001/users.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                user: {name:email ,email: email, password: password, password_confirmation: password}
            })
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log('json', json, json.access_token);
                    this.props.logUser(email);
                    window.localStorage.setItem('access_token', json.auth_token);
                    window.localStorage.setItem('email', email);
                    browserHistory.push('/app');
                });
                console.log('res', res);

            } else {
                console.log("error", res);
            }
        });
    }

    render(){
        return(
            <div className="form-inline" style={{margin: '5%'}}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        style={{marginRight: '5px'}}
                        placeholder="email"
                        onChange={event => this.setState({email: event.target.value})}
                    />
                    <input
                        className="form-control"
                        type="password"
                        style={{marginRight: '5px'}}
                        placeholder="password"
                        onChange={event => this.setState({password: event.target.value})}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => this.signUp()}
                    >
                        Sign Up
                    </button>
                </div>
                {<div>{this.state.error.message}</div>}
                <div><Link to={'/signin'}>Already a user? Sign in instead</Link></div>
            </div>
        )
    }
}

export default connect(null, { logUser })(SignUp);