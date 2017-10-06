import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';
import { setUserEmail } from "../actions/index";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

class App extends Component {
    signOut() {
        window.localStorage.removeItem('access_token');
        browserHistory.replace('/signin');
    }
    render(){
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <span className="navbar-brand">Goal Coach</span>
                            </div>
                            <div className={"sign-out-margin-top pull-right"}>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.signOut()}>
                                    Sign Out
                                </button>
                            </div>
                            <Link className="update-profile-link" to={"/update-profile"}>
                                <div className={"img-circular"}>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className={"content"}>
                    <div style={{margin: '5px'}}>
                        <AddGoal />
                        <hr />
                        <GoalList emaill={this.props.email}/>
                        {/*<h4>Completed Goals</h4>*/}
                        {/*<CompleteGoalList />*/}
                        {/*<hr />*/}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in APP', state);
    const { user } = state;
    const { email } = user;
    return {
        email
    }
}

export default connect(mapStateToProps, null)(App);
