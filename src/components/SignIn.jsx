import React, { Component } from 'react';
import { Link } from 'react-router';
import {logUser} from "../actions/index";
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class SignIn extends Component {
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

    signIn() {
        const { email, password } = this.state;
        fetch("http://localhost:3001//authenticate.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({email: email, password: password})
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log('json ok!!****', json, json.access_token, email);
                    this.props.logUser(email);
                    window.localStorage.setItem('access_token', json.auth_token);
                    window.localStorage.setItem('email', email);
                    browserHistory.push('/app');
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
            <div className="form-inline" style={{margin: '5%'}}>
                <h2>Sign In</h2>
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
                        onClick={() => this.signIn()}
                    >
                        Sign In
                    </button>
                </div>
                <div>{this.state.error.message}</div>
                <div><Link to={'/signup'}>Sign up instead</Link></div>
            </div>
        )
    }
}

export default connect(null, { logUser })(SignIn);