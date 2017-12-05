import React, { Component } from 'react';
import { Link } from 'react-router';
import {logUser, setCurrentUser} from "../actions/index";
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import {SERVER_URL} from '../constants';
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
        var that = this;
        name = '';
        var id = undefined;
        let photoURL = '';
        const { email, password } = this.state;
        fetch(SERVER_URL+"/authenticate.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({email: email, password: password})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    this.props.logUser(email);
                    window.localStorage.setItem('access_token', json.access_token);
                    window.localStorage.setItem('email', email);
                    fetch(SERVER_URL+"/users/"+id+"/?email="+window.localStorage.getItem('email'), {
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
                                var currentUser = { 'id': json.id, 'name': json.name, 'email': json.email, 'image_base': json.image_base};
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
                browserHistory.replace('/signin');
            }
        });
    }

    render() {
        return (
            <div className="container">
                {/*<!--Reg Block-->*/}
                <div className="reg-block">
                    <div className="reg-block-header">
                        <h2>Sign Up</h2>
                        <ul className="social-icons text-center">
                            <li><a className="rounded-x social_facebook" data-original-title="Facebook" href="#"></a></li>
                            <li><a className="rounded-x social_twitter" data-original-title="Twitter" href="#"></a></li>
                            <li><a className="rounded-x social_googleplus" data-original-title="Google Plus" href="#"></a></li>
                            <li><a className="rounded-x social_linkedin" data-original-title="Linkedin" href="#"></a></li>
                        </ul>
                        <p>Don't Have Account? Click
                            <Link className={"color-green"} to={'/signup'}> Sign Up</Link>
                        </p>
                    </div>

                    <div className="input-group margin-bottom-20">
                        <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                        <input
                            className="form-control"
                            type="text"
                            style={{marginRight: '5px'}}
                            placeholder="Enter your Email"
                            onChange={event => this.setState({email: event.target.value})}
                        />
                    </div>
                    <div className="input-group margin-bottom-20">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input
                            className="form-control"
                            type="password"
                            style={{marginRight: '5px'}}
                            placeholder="Enter your Password"
                            onChange={event => this.setState({password: event.target.value})}
                        />
                    </div>
                    <hr/>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" />
                            I read <a target="_blank" href="page_terms.html">Terms and Conditions</a>
                        </label>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <button onClick={() => this.signIn()} className="btn-u btn-block">Log In</button>
                        </div>
                    </div>
                </div>
                {/*<!--End Reg Block-->*/}
            </div>

        )
    }
}

export default connect(null, { logUser, setCurrentUser })(SignIn);