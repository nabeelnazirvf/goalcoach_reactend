import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';
import { setUserEmail } from "../actions/index";

class App extends Component {
    signOut() {
        firebaseApp.auth().signOut();
    }
    render(){

        console.log('hello 123 app.js',this.props.email);

        return (
            <div style={{margin: '5px'}}>
                <h2>Welcome {this.props.email}</h2>
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
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    const { email } = user;
    return {
        email
    }
}

export default connect(mapStateToProps, { setUserEmail })(App);
