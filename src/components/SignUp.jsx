import React, { Component } from 'react';
import { Link } from 'react-router';
import {logUser} from "../actions/index";
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from './Header'
import Footer from './Footer'
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
        var id = undefined;
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
                    console.log('json signUp', json, json.access_token);
                    this.props.logUser(email);
                    window.localStorage.setItem('access_token', json.access_token);
                    window.localStorage.setItem('email', email);
                    fetch("http://localhost:3001/users/"+id+"/?email="+window.localStorage.getItem('email'), {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem('access_token')
                        },
                        mode: 'cors',
                        cache: 'default',
                        body: undefined
                    }).catch((error) => {
                        this.setState({error});
                    }).then((res) => {
                        if (res.ok) {
                            res.json().then((json) => {
                                var currentUser = { 'name': json.name, 'email': json.email, 'image_base': json.image_base};
                                window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            });

                        } else {
                            browserHistory.replace('/signin');
                        }
                    });
                    setTimeout(function() {
                        browserHistory.push('/app');
                    }, 1000);
                });

            } else {
                console.log('json signUp failure');
                console.log("error", res);
            }
        });
    }

    render(){
        return(
            <div>
                <Header current_user={null}/>
            <div className="container">
                <div className="row main">
                    <div className="main-login main-center">
                        <h5 className={"text-center"}>Sign Up</h5>
                        <div className="form-group">
                            <label for="email" className="cols-sm-2 control-label">Your Email</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        style={{marginRight: '5px'}}
                                        placeholder="email"
                                        onChange={event => this.setState({email: event.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="password" className="cols-sm-2 control-label">Password</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                    <input
                                        className="form-control"
                                        type="password"
                                        style={{marginRight: '5px'}}
                                        placeholder="password"
                                        onChange={event => this.setState({password: event.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group ">
                            <a  onClick={() => this.signUp()} type="button" id="button" className="btn btn-primary btn-lg btn-block login-button">SignUp</a>
                        </div>
                        {<div>{this.state.error.message}</div>}
                        <div><Link className={"signup"} to={'/signin'}>Already a user? Sign in instead</Link></div>
                    </div>
                </div>
            </div>
                <Footer/>
            </div>
        )
    }
}

export default connect(null, { logUser })(SignUp);