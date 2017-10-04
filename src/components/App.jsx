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
                <div className={"content"}>
                    <div style={{margin: '5px'}}>
                        <div>
                            <h2>Welcome {this.props.email}</h2>
                            <Link className="btn btn-primary table-responsive" to={"/update-profile"}>Update Profile</Link>
                        </div>
                        <h3>Goal Coach</h3>
                        <AddGoal />
                        <hr />
                        <h4>Goals</h4>
                        <GoalList emaill={this.props.email}/>
                        <hr />
                        <h4>Completed Goals</h4>
                        <CompleteGoalList />
                        <hr />
                        <button
                            className="btn btn-danger"
                            onClick={() => this.signOut()}>
                            Sign Out
                        </button>
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
