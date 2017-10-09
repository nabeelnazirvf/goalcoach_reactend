import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';
import {setCurrentUser, setUserEmail} from "../actions/index";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

class App extends Component {
    componentWillMount() {
        var that = this;
        name = '';
        var id = undefined;
        let photoURL = '';
        var email = window.localStorage.getItem('email');
        console.log('user fetch email', email, this.props);
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
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    name = json.name;
                    photoURL = json.image_base;
                    console.log('that.props.setCurrentUser(json)');
                    that.props.setCurrentUser(json);
                    window.localStorage.removeItem('current_user');
                    var current_user = { 'name': json.name, 'email': json.email, 'photoURL': json.image_base };
                    window.localStorage.setItem('current_user', JSON.stringify(current_user));
                    //this.setState({ displayName: name ? name : '', photoURL: photoURL ? photoURL : 'https://www.cuba-platform.com/support/public/avatars/default-avatar.svg'})
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    signOut() {
        window.localStorage.removeItem('access_token');
        browserHistory.replace('/signin');
    }
    render(){
        const {name, photoURL} = JSON.parse(window.localStorage.getItem('current_user'));
        console.log('JSON.parse(window.localStorage.getItem(\'current_user\'));', name);
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <span className="navbar-brand">Welcome {name} To Goal Coach</span>
                            </div>
                            <div className={"sign-out-margin-top pull-right"}>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.signOut()}>
                                    Sign Out.
                                </button>
                            </div>
                            <Link className="update-profile-link" to={"/update-profile"}>
                                <img src={photoURL} className="img-circular"/>
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className={"content"}>
                    <div style={{margin: '5px'}}>
                        <AddGoal />
                        <hr />
                        <GoalList emaill={this.props.email}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in APP', state);
    const { user } = state;
    const { current_user } = state;
    const { email } = user;
    return {
        email
    }
}

export default connect(mapStateToProps, {setCurrentUser})(App);
